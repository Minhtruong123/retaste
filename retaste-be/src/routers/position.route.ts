import { Router } from 'express';
import positionController from '~/controllers/position.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();

router.post('/create', authentication, authorize(['admin']), positionController.create);
router.put('/update/:id', authentication, authorize(['admin']), positionController.update);
router.delete('/delete/:id', authentication, authorize(['admin']), positionController.deleteById);
router.get('/detail/:id', authentication, authorize(['admin']), positionController.getDetail);
router.get('/list', authentication, authorize(['admin']), positionController.getList);

export const positionRouter = router;
