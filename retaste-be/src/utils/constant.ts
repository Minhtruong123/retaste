export const whitelist = ['http://example1.com', 'http://example2.com'];
export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other'
};
export const STATUS = {
  BAN: 'ban',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
};
export const STATUS_UPLOAD = {
  USED: 'used',
  ORPHAN: 'orphan'
};
export const ROLE_NAME = {
  ADMIN: 'admin',
  CLIENT: 'user',
  SELLER: 'shop'
};
export const HEADERS = {
  ACCESS_TOKEN: 'x-atoken-id',
  CLIENT_ID: 'x-client-id',
  REFRESH_TOKEN: 'x-rtoken-id'
};
export const DISCOUNT_TYPES = {
  FIXED_AMMOUNT: 'fixed_amount',
  PERCENTAGE: 'percentage'
};
export const DISCOUNT_APPLY = {
  ALL: 'all',
  SPECIFIC: 'specific'
};
export const STATUS_ORDER = {
  CANCEL: 'cancel',
  PENDING: 'pending',
  ACTIVE: 'active'
};
export const TYPE_SORT = {
  DESC: 'desc',
  ASC: 'asc'
} as const;
export const LIMIT_ITEMS = 24;
export const PAGE_DEFAULT = 1;
