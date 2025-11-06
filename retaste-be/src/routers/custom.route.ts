import { Router } from 'express';
import customController from '~/controllers/custom.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication } = authMiddleware;
const router = Router();

router.post('/create', authentication, customController.create);
router.get('/get-custom/:productId', authentication, customController.getCustom);
router.put('/update/:id', authentication, customController.update);
router.delete('/delete/:id', authentication, customController.delete);

export const customRouter = router;
