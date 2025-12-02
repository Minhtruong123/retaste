import { Router } from 'express';
import optionController from '~/controllers/option.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();

router.post('/create', authentication, authorize(['admin']), optionController.create);
router.get(
  '/get-option/:customId',
  authentication,
  authorize(['admin', 'user']),
  optionController.getOption
);
router.put('/update/:id', authentication, authorize(['admin']), optionController.update);
router.delete('/delete/:id', authentication, authorize(['admin']), optionController.delete);

export const optionRouter = router;
