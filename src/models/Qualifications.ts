import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDegree {
  degree: string;
  institution: string;
  year: number;
}

export interface ICertification {
  title: string;
  authority: string;
  issueDate: string;
  credentialId?: string;
}

export interface IQualifications extends Document {
  educationalDegrees: IDegree[];
  certifications: ICertification[];
  updatedAt: Date;
}

const QualificationsSchema = new Schema<IQualifications>(
  {
    educationalDegrees: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        year: { type: Number, required: true },
      },
    ],
    certifications: [
      {
        title: { type: String, required: true },
        authority: { type: String, required: true },
        issueDate: { type: String, required: true },
        credentialId: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const Qualifications: Model<IQualifications> =
  mongoose.models.Qualifications ||
  mongoose.model<IQualifications>("Qualifications", QualificationsSchema);

export default Qualifications;
