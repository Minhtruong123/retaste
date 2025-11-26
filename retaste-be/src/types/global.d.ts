declare interface User {
  email: string;
  userId: string;
  role: string;
}
declare interface Staff {
  email: string;
  staffId: string;
  role: string;
}
declare interface Shop {
  shopName: string;
  shopId: string;
}
declare namespace Express {
  export interface Request {
    user: User;
    shop: Shop;
    staff: Staff;
    permission: import('accesscontrol').Permission | import('accesscontrol').Query;
  }
}
