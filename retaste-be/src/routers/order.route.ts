import { Router } from 'express';
import orderController from '~/controllers/order.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();

router.post('/view-order', authentication, authorize(['admin', 'user']), orderController.viewOrder);
router.post('/create', authentication, authorize(['admin', 'user']), orderController.create);
router.put(
  '/change-status/:orderId',
  authentication,
  authorize(['admin']),
  orderController.changeStatus
);
router.put(
  '/cancel/:orderId',
  authentication,
  authorize(['admin', 'user']),
  orderController.cancel
);
router.get(
  '/detail/:orderId',
  authentication,
  authorize(['admin', 'user']),
  orderController.getDetail
);
router.get(
  '/user/detail/:orderId',
  authentication,
  authorize(['user']),
  orderController.getDetailByUser
);
router.get(
  '/user/list',
  authentication,
  authorize(['admin', 'user']),
  orderController.getListOrderByUser
);
router.get('/list', authentication, authorize(['admin', 'user']), orderController.getListOrder);

export const orderRouter = router;
