import { Router } from 'express';
import dashBoardController from '~/controllers/dashboard.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication } = authMiddleware;
const router = Router();

export const dashboardRouter = router;
