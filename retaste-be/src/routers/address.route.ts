import { Router } from 'express';
import addressController from '~/controllers/address.controller';
import { authMiddleware } from '~/middlewares/auth.middleware';
const { authentication } = authMiddleware;
const router = Router();
router.get('/get-list', authentication, addressController.getListAddress);
router.get('/detail/:id', authentication, addressController.getDetail);

router.post('/create', authentication, addressController.createNew);
router.put('/update/:id', authentication, addressController.update);

router.delete('/delete/:id', authentication, addressController.deleteById);

export const addressRouter = router;
