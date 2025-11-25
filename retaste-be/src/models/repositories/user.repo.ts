import { createObjectId } from '~/utils/format';
import User, { IUser } from '../user.model';

const findOneById = async (id: string, option: Partial<IUser> = {}) => {
  return await User.findOne({
    _id: createObjectId(id),
    isDeleted: false,
    ...option
  });
};
const getAdminUser = async () => {
  return await User.findOne({
    role: 'admin'
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
const countUser = async () => {
  return await User.countDocuments({
    isDeleted: false,
    emailVerified: true
  });
};
const deleteEmployee = async (userId: string) => {
  return User.updateOne(
    {
      _id: createObjectId(userId)
    },
    {
      isDeleted: false
    }
  );
};

export const userRepo = {
  findOneByEmail,
  findOneById,
  findOneByVerifyToken,
  createNew,
  update,
  getAdminUser,
  countUser,
  deleteEmployee
};
