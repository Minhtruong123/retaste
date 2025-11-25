import { deliveryRepo } from '~/models/repositories/delivery.repo';
import { orderRepo } from '~/models/repositories/order.repo';
import { userRepo } from '~/models/repositories/user.repo';

class DashboardService {
  static control = async () => {
    const users = await userRepo.countUser();
    const orders = await orderRepo.getAllOrder();
    const revenue = orders.reduce((acc, item) => acc + item.totalAmount, 0);
    const totalOrder = await orderRepo.countOrder();
    const diliveries = await deliveryRepo.getAll();
    return {
      users,
      orders,
      revenue,
      diliveries,
      totalOrder
    };
  };
}
export default DashboardService;
