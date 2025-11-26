import { model, Schema, Types } from 'mongoose';
import { DOCUMENT_STAFF } from './staff.model';
export const DOCUMENT_WORKSHIFT = 'WorkShift';
const COLLECTION_NAME = 'workshifts';

export interface IWorkShift {
  staffId: Types.ObjectId;
  shiftDate: Date;
  scheduledStartTime: string;
  scheduledEndTime: string;
  actualStartTime?: Date;
  actualEndTime?: Date;
  breakDuration?: number;
  shiftStatus?: 'pending' | 'accept' | 'finished' | 'cancel';
  notes?: string;
  isDeleted?: boolean;
}

const workShiftSchema = new Schema<IWorkShift>(
  {
    staffId: { type: Schema.Types.ObjectId, ref: DOCUMENT_STAFF, required: true },
    shiftDate: { type: Date, required: true },
    scheduledStartTime: { type: String, required: true },
    scheduledEndTime: { type: String, required: true },
    actualStartTime: Date,
    actualEndTime: Date,
    breakDuration: { type: Number, default: 0 },
    shiftStatus: {
      type: String,
      enum: ['pending', 'accept', 'finished', 'cancel'],
      default: 'pending'
    },
    notes: String,
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
const WorkShift = model(DOCUMENT_WORKSHIFT, workShiftSchema);

export const workShiftModel = {
  COLLECTION_NAME,
  DOCUMENT_WORKSHIFT
};
export default WorkShift;
