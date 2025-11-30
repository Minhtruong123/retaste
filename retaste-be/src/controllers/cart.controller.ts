import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
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
      if (!req.params.id) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        message: await CartService.updateQuantity(
          {
            id: req.params.id,
            action: req.body.action
          },
          req.user.userId
        )
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  removeProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        message: await CartService.removeProduct(req.params.id, req.user.userId)
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
