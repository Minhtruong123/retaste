import { deliveryRepo } from '~/models/repositories/delivery.repo';
import { orderRepo } from '~/models/repositories/order.repo';
import { userRepo } from '~/models/repositories/user.repo';

class DashboardService {
  static control = async () => {
    const users = await userRepo.countUser();
    const orders = await orderRepo.getAllOrder();
    const totalAmount = (await orderRepo.getTotalAmount()).totalAmount;
    const diliveries = await deliveryRepo.getRateDelivery();

    return {
      users,
      orders,
      diliveries,
      totalAmount
    };
  };
  // static
}
export default DashboardService;
