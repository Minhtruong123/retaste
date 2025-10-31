import { Router } from 'express';
import sizeController from '~/controllers/size.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication } = authMiddleware;
const router = Router();

router.post('/create', authentication, sizeController.create);
router.get('/get-size/:productId', authentication, sizeController.getSize);
router.put('/update/:id', authentication, sizeController.update);
router.delete('/delete/:id', authentication, sizeController.delete);

export const sizeRouter = router;
