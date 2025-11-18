import { Router } from 'express';
import orderController from '~/controllers/order.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication } = authMiddleware;
const router = Router();
router.get('/view-order', authentication, orderController.viewOrder);

export const orderRouter = router;
