import { Schema, model, Types } from 'mongoose';
import { DOCUMENT_USER } from './user.model';

export const DOCUMENT_KEY_STORE = 'KeyStore';
const COLLECTION_NAME = 'key_stores';

export interface IKeyStore {
  userId: Types.ObjectId;
  publicKey: string;
  refreshToken?: string | null;
  refreshTokenUses: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const keyStoreSchema = new Schema<IKeyStore>(
  {
    userId: { type: Schema.Types.ObjectId, ref: DOCUMENT_USER, required: true },
    publicKey: { type: String, required: true },
    refreshToken: { type: String, default: null },
    refreshTokenUses: { type: [String], required: true, default: [] }
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

keyStoreSchema.index({ userId: 1 });

const KeyStore = model<IKeyStore>(DOCUMENT_KEY_STORE, keyStoreSchema);
export const keyStoreModel = {
  DOCUMENT_KEY_STORE,
  COLLECTION_NAME
};
export default KeyStore;
