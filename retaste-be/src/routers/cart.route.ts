import { Router } from 'express';
import cartController from '~/controllers/cart.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication } = authMiddleware;
const router = Router();
router.post('/add-to-cart', authentication, cartController.addToCart);
export const cartRouter = router;
