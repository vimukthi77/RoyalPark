import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActionLog {
  id?: string;
  date: string;
  author: string;
  note: string;
}

export interface IWarningLetter {
  warningId: string;
  title: string;
  issuedDate: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Active" | "Expired" | "Resolved";
  reason: string;
  actionLogs: IActionLog[];
}

export interface IDisciplinary extends Document {
  warningLetters: IWarningLetter[];
  updatedAt: Date;
}

const DisciplinarySchema = new Schema<IDisciplinary>(
  {
    warningLetters: [
      {
        warningId: { type: String, required: true },
        title: { type: String, required: true },
        issuedDate: { type: String, required: true },
        severity: {
          type: String,
          enum: ["Low", "Medium", "High", "Critical"],
          default: "Medium",
        },
        status: {
          type: String,
          enum: ["Active", "Expired", "Resolved"],
          default: "Active",
        },
        reason: { type: String, required: true },
        actionLogs: [
          {
            date: { type: String, required: true },
            author: { type: String, required: true },
            note: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Disciplinary: Model<IDisciplinary> =
  mongoose.models.Disciplinary ||
  mongoose.model<IDisciplinary>("Disciplinary", DisciplinarySchema);

export default Disciplinary;
