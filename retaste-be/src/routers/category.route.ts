import { Router } from 'express';
import categoryController from '~/controllers/category.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
import { multerUploadMiddleware } from '~/middlewares/multerUpload.middleware';
import { uploadMiddleware } from '~/middlewares/uploadCloud.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();

router.get('/detail/:id', authorize(['admin', 'user']), categoryController.getDetail);
router.get('/list-category', authorize(['admin', 'user']), categoryController.getListCategory);

router.post(
  '/create',
  authentication,
  authorize(['admin']),
  multerUploadMiddleware.uploadImage.single('imageUrl'),
  uploadMiddleware.uploadToCloudinary,
  categoryController.create
);
router.put(
  '/update/:id',
  authentication,
  authorize(['admin']),
  multerUploadMiddleware.uploadImage.single('imageUrl'),
  uploadMiddleware.uploadToCloudinary,
  categoryController.update
);

router.delete('/delete/:id', authentication, authorize(['admin']), categoryController.deleteById);

export const categoryRouter = router;
