import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { BAD_REQUEST } from '~/core/errors.response';
import {
  ALLOW_COMMON_FILE_TYPES,
  ALLOW_COMMON_VEDIO_FILE_TYPES,
  LIMIT_COMMON_FILE_SIZE,
  LIMIT_COMMON_VEDIO_FILE_SIZE
} from '~/utils/validations';
// function kiem tra loai file nao duoc chap nhan
const customFileFilterImage = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    const errorMessage = 'File type is invalid. Only accept jpg, jpeg and png';
    return callback(new BAD_REQUEST(errorMessage));
  }
  return callback(null, true);
};
const customFileFilterVedio = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (!ALLOW_COMMON_VEDIO_FILE_TYPES.includes(file.mimetype)) {
    const errorMessage = 'File type is invalid. Only accept mp4, mov, avi and mkv';
    return callback(new BAD_REQUEST(errorMessage));
  }
  return callback(null, true);
};

const uploadImage = multer({
  limits: {
    fileSize: LIMIT_COMMON_FILE_SIZE
  },
  fileFilter: customFileFilterImage
});
const uploadVedio = multer({
  limits: {
    fileSize: LIMIT_COMMON_VEDIO_FILE_SIZE
  },
  fileFilter: customFileFilterVedio
});
export const multerUploadMiddleware = { uploadImage, uploadVedio };
