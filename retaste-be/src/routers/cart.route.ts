import { Router } from 'express';
import cartController from '~/controllers/cart.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();
router.post('/add-to-cart', authentication, authorize(['user']), cartController.addToCart);
router.put(
  '/update-quantity/:id',
  authentication,
  authorize(['user']),
  cartController.updateQuantity
);
router.delete(
  '/remove-product/:id',
  authentication,
  authorize(['user']),
  cartController.removeProduct
);
router.get('/get-detail', authentication, authorize(['user']), cartController.getDetail);
export const cartRouter = router;
