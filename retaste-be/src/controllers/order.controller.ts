import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
import { OK } from '~/core/successes,response';
import OrderService from '~/services/order.service';
import { queryApiValidate } from '~/utils/validations';
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
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await OrderService.create(req.body, req.user.userId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  changeStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.orderId;
      if (!orderId) throw new BAD_REQUEST('OrderId is required !');
      new OK({
        metadata: await OrderService.changeStatus(req.body, orderId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.orderId;
      if (!orderId) throw new BAD_REQUEST('OrderId is required !');
      new OK({
        metadata: await OrderService.cancel(orderId, req.user.userId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.orderId;
      if (!orderId) throw new BAD_REQUEST('OrderId is required !');
      new OK({
        metadata: await OrderService.getDetail(orderId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getDetailByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = req.params.orderId;
      if (!orderId) throw new BAD_REQUEST('OrderId is required !');
      new OK({
        metadata: await OrderService.getDetailByUser(orderId, req.user.userId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getListOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = queryApiValidate(req.query);

      new OK({
        metadata: await OrderService.getListOrder(validate)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getListOrderByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = queryApiValidate(req.query);

      new OK({
        metadata: await OrderService.getListOrderByUser(validate, req.user.userId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new OrderController();
