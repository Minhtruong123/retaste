import { Request, Response, NextFunction } from 'express';
import { OK } from '~/core/successes,response';
import dashboardService from '~/services/dashboard.service';

class dashboardController {
  control = async (req: Request, res: Response, next: NextFunction) => {
    try {
      new OK({
        metadata: await dashboardService.control()
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}
export default new dashboardController();
