import { Router } from 'express';
import sizeController from '~/controllers/size.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();

router.post('/create', authentication, authorize(['admin']), sizeController.create);
router.get('/get-size/:productId', authentication, authorize(['admin']), sizeController.getSize);
router.put('/update/:id', authentication, authorize(['admin']), sizeController.update);
router.delete('/delete/:id', authentication, authorize(['admin']), sizeController.delete);

export const sizeRouter = router;
