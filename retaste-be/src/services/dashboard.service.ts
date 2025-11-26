import moment from 'moment';
import { BAD_REQUEST } from '~/core/errors.response';
import { deliveryRepo } from '~/models/repositories/delivery.repo';
import { orderRepo } from '~/models/repositories/order.repo';
import { userRepo } from '~/models/repositories/user.repo';

class DashboardService {
  static control = async () => {
    const users = await userRepo.countUser();
    const orders = await orderRepo.getTotalAmount();
    const diliveries = await deliveryRepo.getRateDelivery();

    return {
      users,
      orders: orders.orderCount,
      diliveries,
      totalAmount: orders.totalAmount
    };
  };
  static revenue = async () => {
    const orders = await orderRepo.getTotalAmount();
    return {
      totalAmount: orders.totalAmount,
      avgAmount: orders.averageOrderValue,
      orders: orders.orderCount
    };
  };
  // date truyền iso string
  static getRenvenueByTime = async (data: { type: 'day' | 'month'; date?: string }) => {
    const { type, date } = data;
    const targetDate = date ? moment(date) : moment();
    if (!targetDate.isValid) throw new BAD_REQUEST('Date is not valid !');
    let start, end;
    if (type === 'month') {
      start = targetDate.startOf(type).toDate();
      end = targetDate.startOf(type).toDate();
    } else {
      start = targetDate.startOf(type).toDate();
      end = targetDate.startOf(type).toDate();
    }
    const result = await orderRepo.getRenvenureByTime({
      start,
      end
    });
    return result;
  };
  static getRenvenueByCategory = async () => {};
}
export default DashboardService;
