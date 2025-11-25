import { Request, Response, NextFunction } from 'express';
import { OK } from '~/core/successes,response';
class UploadController {
  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: req.body
      }).send(res);
    } catch (error) {
      console.error('REGISTER ERROR:', error);
      next(error);
    }
  };
}
export default new UploadController();
