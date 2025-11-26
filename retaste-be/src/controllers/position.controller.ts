import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
import { OK } from '~/core/successes,response';
import DepartmentService from '~/services/position.service';
import { queryApiValidate } from '~/utils/validations';

class DepartmentController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await DepartmentService.create(req.body)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id) throw new BAD_REQUEST('PositionId is required !');
      new OK({
        metadata: await DepartmentService.update(req.body, id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id) throw new BAD_REQUEST('PositionId is required !');
      new OK({
        metadata: await DepartmentService.deleteById(id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id) throw new BAD_REQUEST('PositionId is required !');
      new OK({
        metadata: await DepartmentService.getDetail(id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = queryApiValidate(req.query);
      new OK({
        metadata: await DepartmentService.getList(validate)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new DepartmentController();
