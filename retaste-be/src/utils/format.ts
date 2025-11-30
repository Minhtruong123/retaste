import mongoose from 'mongoose';
import lodash from 'lodash';
import slugify from 'slugify';
import crypto from 'crypto';

export const createObjectId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};
export const pickUser = (ob = {}, pickData = ['']) => {
  return lodash.pick(ob, pickData);
};
export const unPickData = (ob = {}, unPickData = ['']) => {
  return lodash.omit(ob, unPickData);
};
export const customSlug = (slug: string = '') => {
  return (
    slugify(slug, {
      lower: true,
      trim: true,
      locale: 'vi',
      strict: true
    }) +
    '-' +
    Date.now()
  );
};

type CustomItem = {
  customId: string;
  optionId: string;
  quantity?: number;
};

type Product = {
  productId: string;
  customs: CustomItem[];
  quantity: number;
};

export const areCustomsEqual = (data: Product, customs: CustomItem[]): boolean => {
  const dataCustoms = data?.customs ?? [];

  if (dataCustoms.length !== customs.length) return false;

  const normalize = (arr: CustomItem[]): string =>
    arr
      .map((item) =>
        JSON.stringify(
          Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b)))
        )
      )
      .sort()
      .join('|');

  return normalize(dataCustoms) === normalize(customs);
};
export const generateOrderNumber = () => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');

  const timestamp = Date.now().toString();
  const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();

  return `ORD${datePart}${timestamp}${randomHex}`;
};
