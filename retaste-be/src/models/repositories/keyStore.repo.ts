import { createObjectId } from '~/utils/format';
import KeyStore, { IKeyStore } from '../keyStore.model';

const findOneByUserId = async (userId: string) => {
  return await KeyStore.findOne({ userId: createObjectId(userId) });
};

const createNew = async (data: IKeyStore) => {
  return await KeyStore.findOneAndUpdate(
    { userId: data.userId },
    { $set: data },
    { upsert: true, returnDocument: 'after' }
  );
};

const update = async (userId: string, data: Partial<IKeyStore>, refreshTokenUse: string) => {
  return await KeyStore.updateOne(
    { userId: createObjectId(userId) },
    { $push: { refreshTokenUses: refreshTokenUse }, $set: data }
  );
};

const deleteByUserId = async (userId: string) => {
  return await KeyStore.deleteOne({ userId: createObjectId(userId) });
};

export const keyStoreRepo = {
  createNew,
  findOneByUserId,
  update,
  deleteByUserId
};
