import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
import { OK } from '~/core/successes,response';
import ProductService from '~/services/product.service';
import { queryApiValidate } from '~/utils/validations';
class ProductController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await ProductService.create(req.body)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await ProductService.update(req.body, req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getListProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = queryApiValidate(req.query);
      new OK({
        metadata: await ProductService.getListProduct(validate)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await ProductService.getDetail(req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await ProductService.delete(req.params.id)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
  retaste = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await ProductService.retaste(req.user.userId)
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new ProductController();
