import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
import { OK } from '~/core/successes,response';
import CategoryService from '~/services/category.service';
import { queryApiValidate } from '~/utils/validations';
class CategoryController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await CategoryService.create(req.body)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.productId) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await CategoryService.update(req.body, req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getListCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = queryApiValidate(req.query);
      if (!req.params.productId) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await CategoryService.getListCategory(validate)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.productId) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await CategoryService.delete(req.params.productId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.productId) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await CategoryService.getDetail(req.params.productId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new CategoryController();
