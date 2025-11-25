import { Request, Response, NextFunction } from 'express';
import { CloudinaryProvider } from '~/providers/cloud.provider';

const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next();
  } else {
    const upload = (await CloudinaryProvider.streamUpload(req.file.buffer, 'upload')) as {
      secure_url: string;
    };
    req.body[req.file.fieldname] = upload.secure_url;
    return next();
  }
};

export const uploadMiddleware = {
  uploadToCloudinary
};
