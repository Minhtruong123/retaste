import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '~/core/errors.response';
import { OK } from '~/core/successes,response';
import AddressService from '~/services/address.service';
import { queryApiValidate } from '~/utils/validations';
class AddressController {
  createNew = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await AddressService.createNew(req.body, req.user.userId)
      }).send(res);
    } catch (error) {
      console.error('REGISTER ERROR:', error);
      next(error);
    }
  };
  getListAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validate = queryApiValidate(req.query);
      new OK({
        metadata: await AddressService.getListAddress(validate)
      }).send(res);
    } catch (error) {
      console.error('REGISTER ERROR:', error);
      next(error);
    }
  };
  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await AddressService.deleteById(req.params.id, req.user.userId)
      }).send(res);
    } catch (error) {
      console.error('REGISTER ERROR:', error);
      next(error);
    }
  };
  getDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await AddressService.getDetail(req.params.id, req.user.userId)
      }).send(res);
    } catch (error) {
      console.error('REGISTER ERROR:', error);
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) {
        throw new BAD_REQUEST('Invalid request !');
      }
      new OK({
        metadata: await AddressService.update(req.body, req.params.id, req.user.userId)
      }).send(res);
    } catch (error) {
      console.error('REGISTER ERROR:', error);
      next(error);
    }
  };
}
export default new AddressController();
