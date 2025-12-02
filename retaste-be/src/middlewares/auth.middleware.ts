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
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!clientId || !token) {
      throw new UNAUTHORIZED();
    }

    const getKeyUser = await keyStoreRepo.findOneByUserId(clientId);
    if (!getKeyUser) {
      throw new UNAUTHORIZED();
    }
    const decodedToken = JwtProvider.verifyToken(token, getKeyUser.publicKey) as User;
    req.user = decodedToken;
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
const authorize = (allowedRoles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Authorize middleware chạy');
      console.log('allowedRoles:', allowedRoles);
      console.log('req.user:', req.user);

      const user = req.user;
      if (!user) {
        return next(new UNAUTHORIZED('User not found in req.user'));
      }
      if (!allowedRoles.includes(user.role)) {
        return next(new UNAUTHORIZED('Not allowed'));
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export const authMiddleware = {
  authentication,
  authorize
};
