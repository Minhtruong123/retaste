import { Request, Response, NextFunction } from 'express';
import { OK } from '~/core/successes,response';
import CartService from '~/services/cart.service';

class CartController {
  addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await CartService.addToCart(req.body, req.user.userId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        message: await CartService.updateQuantity(req.body, req.user.userId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  removeProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        message: await CartService.removeProduct(req.body, req.user.userId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: (await CartService.getCartDetail(req.user.userId)) || []
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new CartController();
