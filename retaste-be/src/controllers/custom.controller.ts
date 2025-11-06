import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
import { OK } from '~/core/successes,response';
import CustomService from '~/services/custom.service';
class CustomController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await CustomService.create(req.body)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getCustom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.productId) throw new BAD_REQUEST('Invalid request !');
      new OK({
        metadata: await CustomService.getCustom(req.params.productId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw new BAD_REQUEST('Invalid request !');
      new OK({
        metadata: await CustomService.update(req.body, req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw new BAD_REQUEST('Invalid request !');
      new OK({
        metadata: await CustomService.delete(req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new CustomController();
