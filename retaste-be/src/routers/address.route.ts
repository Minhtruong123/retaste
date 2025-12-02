import { Router } from 'express';
import addressController from '~/controllers/address.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication, authorize } = authMiddleware;
const router = Router();
router.get(
  '/get-list',
  authentication,
  authorize(['admin', 'user']),
  addressController.getListAddress
);
router.get(
  '/detail/:id',
  authentication,
  authorize(['admin', 'user']),
  addressController.getDetail
);

router.post('/create', authentication, authorize(['user']), addressController.createNew);
router.put('/update/:id', authentication, authorize(['user']), addressController.update);

router.delete('/delete/:id', authentication, authorize(['user']), addressController.deleteById);

export const addressRouter = router;
