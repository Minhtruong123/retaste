import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { BAD_REQUEST, CONFLICT, FORBIDDEN, UNAUTHORIZED } from '~/core/errors.response';
import { keyStoreRepo } from '~/models/repositories/keyStore.repo';
import { userRepo } from '~/models/repositories/user.repo';
import { BrevoProvider } from '~/providers/brevo.provider';
import { JwtProvider } from '~/providers/jwt.provider';
import { createObjectId, pickUser } from '~/utils/format';
import { generateKeyPairSync } from '~/utils/generate';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '~/models/user.model';
import { IKeyStore } from '~/models/keyStore.model';
class AccessService {
  static register = async (data: {
    email: string;
    phoneNumber?: string;
    password: string;
    fullName: string;
  }) => {
    const emailExist = await userRepo.findOneByEmail(data.email);
    if (emailExist) {
      if (!emailExist.emailVerified) {
        throw new CONFLICT('Please check your email to verify your account !');
      }
      throw new BAD_REQUEST('Email is already exist !');
    }
    const newPassowrd = bcrypt.hashSync(data.password, 10);
    const newUser = {
      ...data,
      passwordHash: newPassowrd,
      emailVerified: false,
      phoneVerified: false,
      addresses: [],
      isActive: true,
      verifyToken: uuidv4()
    };
    const userCreated = await userRepo.createNew(newUser as IUser);
    if (!userCreated) {
      throw new BAD_REQUEST('Create account falure');
    }

    await BrevoProvider.verifyAccount(newUser.email, newUser.verifyToken);
    return 'Create new user success !';
  };
  static login = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const getUser = await userRepo.findOneByEmail(email);
    if (!getUser) throw new UNAUTHORIZED('Password or email is not correct !');
    if (!getUser.emailVerified)
      throw new BAD_REQUEST('Please check your email to cofirm account !');
    if (!getUser.isActive) throw new FORBIDDEN('Your account violates our policies');
    if (!bcrypt.compareSync(password, getUser.passwordHash))
      throw new UNAUTHORIZED('Password or email is not correct !');
    const { privateKey, publicKey } = generateKeyPairSync();
    const payload = {
      userId: getUser._id.toString(),
      email: getUser.email
    };
    const pairToken = JwtProvider.generatePairToken(payload, privateKey);
    if (!pairToken) throw new UNAUTHORIZED('Login failed !');
    const { accessToken, refreshToken } = pairToken;
    await keyStoreRepo.createNew({
      publicKey,
      refreshToken,
      userId: createObjectId(getUser._id.toString()),
      refreshTokenUses: []
    } as IKeyStore);
    // await userRedis.setRfToken(
    //   getUser._id.toString(),
    //   {
    //     refreshToken,
    //     publicKey
    //   },
    //   ms('7 days') / 1000
    // );
    return {
      accessToken,
      refreshToken,
      user: pickUser(getUser, ['email', 'phoneNumber', 'fullName'])
    };
  };
  static verifyAccount = async (data: { verifyToken: string }) => {
    const { verifyToken } = data;
    const user = await userRepo.findOneByVerifyToken(verifyToken);
    if (!user) {
      throw new BAD_REQUEST('You comfirmed');
    }
    await userRepo.update({ verifyToken: null, emailVerified: true }, user._id.toString());

    return 'Verify account success !';
  };
  // Cập nhật lại nếu refreshtoken lỗi thì throw lỗi để bên clien tự động đăng xuất
  static refreshToken = async ({
    refreshTokenClient,
    clientId
  }: {
    refreshTokenClient: string;
    clientId: string;
  }) => {
    if (!clientId || !refreshTokenClient) throw new UNAUTHORIZED();

    // if (getKeyRedis) {
    //   const { refreshToken } = getKeyRedis;
    //   if (refreshToken !== refreshTokenClient) {
    //     await userRedis.delKeyStore(clientId);
    //     await keyStoreRepo.deleteByUserId(clientId);
    //     throw new UNAUTHORIZED('Refresh token is not valid !');
    //   }
    //   payload = jwtDecode(refreshTokenClient);
    // } else {
    const getKeyRedis = (await keyStoreRepo.findOneByUserId(clientId)) as IKeyStore;
    if (!getKeyRedis) {
      throw new UNAUTHORIZED();
    }
    if (getKeyRedis.refreshToken !== refreshTokenClient) {
      await keyStoreRepo.deleteByUserId(clientId);
      throw new UNAUTHORIZED('Refresh token is not valid !');
    }
    const payload = jwtDecode(refreshTokenClient);
    // }
    delete payload.iat;
    delete payload.exp;
    const { privateKey, publicKey } = generateKeyPairSync();
    const pairToken = JwtProvider.generatePairToken(payload, privateKey);
    if (!pairToken) {
      throw new BAD_REQUEST();
    }
    await keyStoreRepo.update(
      clientId,
      {
        publicKey,
        refreshToken: pairToken.refreshToken
      },
      refreshTokenClient
    );
    // await userRedis.setRfToken(
    //   clientId,
    //   {
    //     publicKey,
    //     refreshToken: pairToken.refreshToken
    //   },
    //   ms('7 days') / 1000
    // );
    return {
      accessToken: pairToken.accessToken,
      refreshToken: pairToken.refreshToken
    };
  };
  static logout = async (user: User) => {
    const deleteKeyUser = await keyStoreRepo.deleteByUserId(user.userId);
    if (!deleteKeyUser) {
      throw new BAD_REQUEST();
    }
    return 'Logout success !';
  };
}
export default AccessService;
