import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
import { OK } from '~/core/successes,response';
import OrderService from '~/services/order.service';
class OrderController {
  viewOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await OrderService.viewOrder(req.body, req.user.userId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new OrderController();
