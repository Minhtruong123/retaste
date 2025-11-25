import { Schema } from 'mongoose';
import { DOCUMENT_USER } from './user.model';

const employeeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: DOCUMENT_USER },
    employeeCode: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,

    hireDate: { type: Date, required: true },
    terminationDate: Date,
    employmentStatus: {
      type: String,
      enum: ['active', 'on_leave', 'terminated', 'suspended'],
      default: 'active'
    },

    jobTitle: String,
    department: String,
    hourlyRate: Number,

    roles: [
      {
        roleId: { type: Schema.Types.ObjectId, ref: 'Role' },
        assignedAt: { type: Date, default: Date.now },
        assignedBy: { type: Schema.Types.ObjectId, ref: 'Employee' }
      }
    ],

    workShifts: [
      {
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
        notes: String
      }
    ]
  },
  {
    timestamps: true
  }
);
