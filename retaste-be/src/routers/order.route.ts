import { Router } from 'express';
import orderController from '~/controllers/order.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication } = authMiddleware;
const router = Router();

router.get('/view-order', authentication, orderController.viewOrder);
router.post('/create', authentication, orderController.create);
router.put('/change-status/:orderId', authentication, orderController.changeStatus);
router.put('/cancel/:orderId', authentication, orderController.cancel);
router.get('/detail/:orderId', authentication, orderController.getDetail);
router.get('/user/detail/:orderId', authentication, orderController.getDetailByUser);
router.get('/user/list', authentication, orderController.getListOrderByUser);
router.get('/list', authentication, orderController.getListOrder);

export const orderRouter = router;
