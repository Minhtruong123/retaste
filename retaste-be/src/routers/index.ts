import { Router } from 'express';
import { accessRouter } from './access.route';
import { categoryRouter } from './category.route';
import { productRouter } from './product.route';
import { sizeRouter } from './size.route';
import { customRouter } from './custom.route';
import { optionRouter } from './option.route';
import { cartRouter } from './cart.route';

const router = Router();

router.use('/access', accessRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/size', sizeRouter);
router.use('/custom', customRouter);
router.use('/option', optionRouter);
router.use('/cart', cartRouter);

export const indexRoute = router;
