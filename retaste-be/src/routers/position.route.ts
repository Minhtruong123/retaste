import { Router } from 'express';
import positionController from '~/controllers/position.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication } = authMiddleware;
const router = Router();

router.post('/create', authentication, positionController.create);
router.put('/update/:id', authentication, positionController.update);
router.delete('/delete/:id', authentication, positionController.deleteById);
router.get('/detail/:id', authentication, positionController.getDetail);
router.get('/list', authentication, positionController.getList);

export const positionRouter = router;
