import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILeave extends Document {
  annualLeave: number;
  annualLeaveMax: number;
  casualPreApproved: number;
  casualPostApproved: number;
  medicalLeave: number;
  medicalLeaveMax: number;
  noPayAbsenteeism: number;
  employmentTypeRules: string;
  leaveHistory: Array<{
    type: string;
    startDate: string;
    endDate: string;
    days: number;
    status: "Approved" | "Pending" | "Rejected";
    reason: string;
  }>;
  updatedAt: Date;
}

const LeaveSchema = new Schema<ILeave>(
  {
    annualLeave: { type: Number, default: 14 },
    annualLeaveMax: { type: Number, default: 21 },
    casualPreApproved: { type: Number, default: 5 },
    casualPostApproved: { type: Number, default: 2 },
    medicalLeave: { type: Number, default: 11 },
    medicalLeaveMax: { type: Number, default: 14 },
    noPayAbsenteeism: { type: Number, default: 0 },
    employmentTypeRules: {
      type: String,
      default:
        "Permanent Executive Grade: 21 Days Annual Leave + 14 Days Medical Leave. Pre-approval required 48 hours prior for Casual Leave. Absenteeism without authorization triggers No-Pay payroll deduction.",
    },
    leaveHistory: [
      {
        type: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        days: { type: Number, required: true },
        status: {
          type: String,
          enum: ["Approved", "Pending", "Rejected"],
          default: "Approved",
        },
        reason: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const Leave: Model<ILeave> =
  mongoose.models.Leave || mongoose.model<ILeave>("Leave", LeaveSchema);

export default Leave;
