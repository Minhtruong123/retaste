import { model, Schema } from 'mongoose';
export const DOCUMENT_POSITION = 'position';
const COLLECTION_NAME = 'positions';

export interface IPosition {
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

const positionSchema = new Schema<IPosition>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);
const Position = model<IPosition>(DOCUMENT_POSITION, positionSchema);

export const positionModel = {
  COLLECTION_NAME,
  DOCUMENT_POSITION
};
export default Position;
