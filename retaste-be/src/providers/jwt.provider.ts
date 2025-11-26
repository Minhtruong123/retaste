import jwt, { SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';

const generatePairToken = (payload: object, privateKey: string) => {
  try {
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1h'
    });
    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7 days'
    });
    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
const generateToken = async (userInfo: object, secretSignature: string, tokenLife: string) => {
  try {
    const signOptions: SignOptions = {
      algorithm: 'HS256',
      expiresIn: tokenLife as StringValue
    };

    return jwt.sign(userInfo, secretSignature, signOptions);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const verifyToken = (token: string, publicKey: string) => {
  try {
    return jwt.verify(token, publicKey);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
export const JwtProvider = {
  generatePairToken,
  verifyToken,
  generateToken
};
