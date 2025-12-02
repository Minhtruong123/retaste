import { Router } from 'express';
import uploadCloudController from '~/controllers/uploadCloud.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
import { multerUploadMiddleware } from '~/middlewares/multerUpload.middleware';
import { uploadMiddleware } from '~/middlewares/uploadCloud.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();

router.post(
  '/update',
  authentication,
  authorize(['admin']),
  multerUploadMiddleware.uploadImage.single('image'),
  uploadMiddleware.uploadToCloudinary,
  uploadCloudController.upload
);

export const uploadCloudRouter = router;
