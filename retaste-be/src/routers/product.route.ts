import { Router } from 'express';
import productController from '~/controllers/product.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
import { multerUploadMiddleware } from '~/middlewares/multerUpload.middleware';
import { uploadMiddleware } from '~/middlewares/uploadCloud.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();

router.post(
  '/create',
  authentication,
  authorize(['admin']),
  multerUploadMiddleware.uploadImage.single('imageUrl'),
  uploadMiddleware.uploadToCloudinary,
  productController.create
);
router.put(
  '/update/:id',
  authentication,
  authorize(['admin']),
  multerUploadMiddleware.uploadImage.single('imageUrl'),
  uploadMiddleware.uploadToCloudinary,
  productController.update
);
router.get(
  '/list-product',
  authentication,
  authorize(['admin', 'user']),
  productController.getListProduct
);
router.get(
  '/detail/:id',
  authentication,
  authorize(['admin', 'user']),
  productController.getDetail
);
router.delete('/delete/:id', authentication, authorize(['admin']), productController.delete);
router.get('/retaste', authentication, authorize(['admin', 'user']), productController.retaste);

export const productRouter = router;
