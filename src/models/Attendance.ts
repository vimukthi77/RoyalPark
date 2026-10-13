import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttendanceRecord {
  date: string;
  checkInTime: string;
  expectedTime: string;
  delayMinutes: number;
  reason: string;
}

export interface IAttendance extends Document {
  mtdLateArrivals: number;
  totalMinutesLate: number;
  monthsWithInfractions: number;
  thresholdLimit: number;
  complianceStatus: "Compliant" | "Watchlist" | "Policy Breach";
  attendanceTrend: Array<{
    month: string;
    lateCount: number;
    minutesLate: number;
  }>;
  recentRecords: IAttendanceRecord[];
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    mtdLateArrivals: { type: Number, default: 2 },
    totalMinutesLate: { type: Number, default: 35 },
    monthsWithInfractions: { type: Number, default: 1 },
    thresholdLimit: { type: Number, default: 3 },
    complianceStatus: {
      type: String,
      enum: ["Compliant", "Watchlist", "Policy Breach"],
      default: "Compliant",
    },
    attendanceTrend: [
      {
        month: { type: String, required: true },
        lateCount: { type: Number, default: 0 },
        minutesLate: { type: Number, default: 0 },
      },
    ],
    recentRecords: [
      {
        date: { type: String, required: true },
        checkInTime: { type: String, required: true },
        expectedTime: { type: String, default: "08:30 AM" },
        delayMinutes: { type: Number, required: true },
        reason: { type: String, default: "Traffic delay" },
      },
    ],
  },
  { timestamps: true }
);

const Attendance: Model<IAttendance> =
  mongoose.models.Attendance ||
  mongoose.model<IAttendance>("Attendance", AttendanceSchema);

export default Attendance;
