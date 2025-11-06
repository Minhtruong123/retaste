import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
import { OK } from '~/core/successes,response';
import SizeService from '~/services/size.service';
class SizeController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await SizeService.create(req.body)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getSize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.productId) throw new BAD_REQUEST('Invalid request !');
      new OK({
        metadata: await SizeService.getSize(req.params.productId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw new BAD_REQUEST('Invalid request !');
      new OK({
        metadata: await SizeService.update(req.body, req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw new BAD_REQUEST('Invalid request !');
      new OK({
        metadata: await SizeService.delete(req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new SizeController();
