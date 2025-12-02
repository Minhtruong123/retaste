import { Router } from 'express';
import customController from '~/controllers/custom.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();

router.post('/create', authentication, authorize(['admin']), customController.create);
router.get(
  '/get-custom/:productId',
  authentication,
  authorize(['admin', 'user']),
  customController.getCustom
);
router.put('/update/:id', authentication, authorize(['admin']), customController.update);
router.delete('/delete/:id', authentication, authorize(['admin']), customController.delete);

export const customRouter = router;
