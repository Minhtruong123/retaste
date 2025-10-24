import mongoose from 'mongoose';
import lodash from 'lodash';
import slugify from 'slugify';

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
