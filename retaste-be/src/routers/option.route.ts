import { Router } from 'express';
import optionController from '~/controllers/option.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication } = authMiddleware;
const router = Router();

router.post('/create', authentication, optionController.create);
router.get('/get-option/:customId', authentication, optionController.getOption);
router.put('/update/:id', authentication, optionController.update);
router.delete('/delete/:id', authentication, optionController.delete);

export const optionRouter = router;
