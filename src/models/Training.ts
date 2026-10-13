import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICompletedProgram {
  title: string;
  completionDate: string;
  provider: string;
  score: number;
}

export interface IOngoingCourse {
  title: string;
  progress: number;
  instructor: string;
  deadline: string;
}

export interface IMandatoryCompliance {
  name: string;
  status: "Compliant" | "Pending" | "Overdue";
  dueDate: string;
}

export interface ITraining extends Document {
  earnedCredits: number;
  complianceAudit: {
    compliantModules: number;
    pendingActions: number;
    overdueCount: number;
  };
  completedPrograms: ICompletedProgram[];
  ongoingCourses: IOngoingCourse[];
  mandatoryCompliance: IMandatoryCompliance[];
  updatedAt: Date;
}

const TrainingSchema = new Schema<ITraining>(
  {
    earnedCredits: { type: Number, default: 48 },
    complianceAudit: {
      compliantModules: { type: Number, default: 8 },
      pendingActions: { type: Number, default: 1 },
      overdueCount: { type: Number, default: 0 },
    },
    completedPrograms: [
      {
        title: { type: String, required: true },
        completionDate: { type: String, required: true },
        provider: { type: String, required: true },
        score: { type: Number, default: 95 },
      },
    ],
    ongoingCourses: [
      {
        title: { type: String, required: true },
        progress: { type: Number, default: 60 },
        instructor: { type: String, default: "" },
        deadline: { type: String, default: "" },
      },
    ],
    mandatoryCompliance: [
      {
        name: { type: String, required: true },
        status: {
          type: String,
          enum: ["Compliant", "Pending", "Overdue"],
          default: "Compliant",
        },
        dueDate: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Training: Model<ITraining> =
  mongoose.models.Training || mongoose.model<ITraining>("Training", TrainingSchema);

export default Training;
