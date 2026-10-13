import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRatingYear {
  score: number;
  tag: "Exceeds Expectations" | "Strong Performer" | "Satisfactory" | "Needs Improvement";
}

export interface IMilestone {
  title: string;
  achieved: boolean;
  targetDate: string;
}

export interface IPerformance extends Document {
  ratings: {
    year2023: IRatingYear;
    year2024: IRatingYear;
    year2025: IRatingYear;
  };
  coreFocusDetails: string;
  milestonesAchieved: IMilestone[];
  kpiExecutionScore: number;
  leadershipScore: number;
  tenantSatisfactionRate: number;
  updatedAt: Date;
}

const PerformanceSchema = new Schema<IPerformance>(
  {
    ratings: {
      year2023: {
        score: { type: Number, default: 91 },
        tag: { type: String, default: "Strong Performer" },
      },
      year2024: {
        score: { type: Number, default: 96 },
        tag: { type: String, default: "Exceeds Expectations" },
      },
      year2025: {
        score: { type: Number, default: 94 },
        tag: { type: String, default: "Exceeds Expectations" },
      },
    },
    coreFocusDetails: {
      type: String,
      default:
        "Modernizing condominium energy efficiency, zero-downtime elevator predictive maintenance, and enhancing 5-star concierge resident satisfaction.",
    },
    milestonesAchieved: [
      {
        title: { type: String, required: true },
        achieved: { type: Boolean, default: false },
        targetDate: { type: String, required: true },
      },
    ],
    kpiExecutionScore: { type: Number, default: 95 },
    leadershipScore: { type: Number, default: 92 },
    tenantSatisfactionRate: { type: Number, default: 98 },
  },
  { timestamps: true }
);

const Performance: Model<IPerformance> =
  mongoose.models.Performance ||
  mongoose.model<IPerformance>("Performance", PerformanceSchema);

export default Performance;
