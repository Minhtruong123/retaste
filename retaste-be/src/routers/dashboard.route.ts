import { Router } from 'express';
import dashBoardController from '~/controllers/dashboard.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();
router.get('/control', authentication, authorize(['admin']), dashBoardController.control);

export const dashboardRouter = router;
