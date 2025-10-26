import { Router } from 'express';
import categoryController from '~/controllers/category.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
import { multerUploadMiddleware } from '~/middlewares/multerUpload.middleware';
import { uploadMiddleware } from '~/middlewares/uploadCloud.middleware';
const { authentication } = authMiddleware;
const router = Router();

router.get('/detail/:id', authentication, categoryController.getDetail);
router.get('/list-category', authentication, categoryController.getListCategory);

router.post(
  '/create',
  authentication,
  multerUploadMiddleware.uploadImage.single('imageUrl'),
  uploadMiddleware.uploadToCloudinary,
  categoryController.create
);
router.put(
  '/update/:id',
  authentication,
  multerUploadMiddleware.uploadImage.single('imageUrl'),
  uploadMiddleware.uploadToCloudinary,
  categoryController.update
);

router.delete('/delete/:id', authentication, categoryController.deleteById);

export const categoryRouter = router;
