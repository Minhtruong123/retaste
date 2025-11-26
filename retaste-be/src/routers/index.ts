import { Router } from 'express';
import { accessRouter } from './access.route';
import { categoryRouter } from './category.route';
import { productRouter } from './product.route';
import { sizeRouter } from './size.route';
import { customRouter } from './custom.route';
import { optionRouter } from './option.route';
import { cartRouter } from './cart.route';
import { orderRouter } from './order.route';
import { addressRouter } from './address.route';
import { uploadCloudRouter } from './upload.route';
import { dashboardRouter } from './dashboard.route';
import { positionRouter } from './position.route';

const router = Router();

router.use('/access', accessRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/size', sizeRouter);
router.use('/custom', customRouter);
router.use('/option', optionRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/address', addressRouter);
router.use('/upload', uploadCloudRouter);
router.use('/dashboard', dashboardRouter);
router.use('/position', positionRouter);
export const indexRoute = router;
