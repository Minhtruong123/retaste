import { Request, Response, NextFunction } from 'express';
import { REFRESH_TOKEN, UNAUTHORIZED } from '~/core/errors.response';
import { keyStoreRepo } from '~/models/repositories/keyStore.repo';
import { JwtProvider } from '~/providers/jwt.provider';
import { HEADERS } from '~/utils/constant';

/**
 * Hàm này dùng đề giải mã token
 * Kiểm tra user có tồn tại trong hệ thống hay không
 */
const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientId = req.headers[HEADERS.CLIENT_ID]?.toString();
    const accessToken = req.headers[HEADERS.ACCESS_TOKEN]?.toString();
    if (!clientId || !accessToken) {
      throw new UNAUTHORIZED();
    }
    // const getKeyRedis = await userRedis.getKeyStore(`rfToken:${clientId}`);
    // if (getKeyRedis) {
    //   const decodedToken = JwtProvider.verifyToken(accessToken, getKeyRedis.publicKey) as User;
    //   req.user = decodedToken;
    // } else {
    const getKeyUser = await keyStoreRepo.findOneByUserId(clientId);
    if (!getKeyUser) {
      throw new UNAUTHORIZED();
    }
    const decodedToken = JwtProvider.verifyToken(accessToken, getKeyUser.publicKey) as User;
    req.user = decodedToken;
    // }
    return next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'jwt expired') {
        return next(new REFRESH_TOKEN());
      }
    }
    next(new UNAUTHORIZED());
  }
};

export const authMiddleware = {
  authentication
};
