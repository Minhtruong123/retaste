import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
import { OK } from '~/core/successes,response';
import OptionService from '~/services/option.service';
class OptionController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await OptionService.create(req.body)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getOption = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.customId) throw new BAD_REQUEST('Invalid request !');
      new OK({
        metadata: await OptionService.getOption(req.params.customId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw new BAD_REQUEST('Invalid request !');
      new OK({
        metadata: await OptionService.update(req.body, req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw new BAD_REQUEST('Invalid request !');
      new OK({
        metadata: await OptionService.delete(req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new OptionController();
