import { createObjectId } from '~/utils/format';
import User, { IUser } from '../user.model';

const findOneById = async (id: string) => {
  return await User.findOne({
    _id: createObjectId(id),
    isDeleted: false
  });
};

const findOneByEmail = async (email: string, filter?: object) => {
  return await User.findOne({
    email: email,
    isDeleted: false,
    ...filter
  });
};
const findOneByVerifyToken = async (verifyToken: string) => {
  return await User.findOne({
    verifyToken: verifyToken,
    isDeleted: false
  });
};
const createNew = async (data: IUser) => {
  return await User.insertOne(data);
};
const update = async (data: Partial<IUser>, userId: string) => {
  return await User.updateOne(
    {
      _id: createObjectId(userId),
      isDeleted: false
    },
    {
      $set: data
    }
  );
};

export const userRepo = {
  findOneByEmail,
  findOneById,
  findOneByVerifyToken,
  createNew,
  update
};
