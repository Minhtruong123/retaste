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
  multerUploadMiddleware.uploadImage.single('imageUrl'),
  uploadMiddleware.uploadToCloudinary,
  productController.create
);
router.put(
  '/update/:id',
  authentication,
  multerUploadMiddleware.uploadImage.single('imageUrl'),
  uploadMiddleware.uploadToCloudinary,
  productController.update
);
router.get('/list-product', authentication, productController.getListProduct);
router.get('/detail/:id', authentication, productController.getDetail);
router.delete('/delete/:id', authentication, productController.delete);
router.get('/retaste', authentication, productController.retaste);

export const productRouter = router;
