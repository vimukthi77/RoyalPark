import mongoose, { Schema, Document, Model } from "mongoose";

export interface IChild {
  name: string;
  age: number;
}

export interface IProfile extends Document {
  fullName: string;
  email: string;
  roleTitle: string;
  workStatus: "Active" | "Inactive";
  employmentType: "Permanent Full-Time" | "Contract" | "Probation" | "Part-Time";
  civilStatus: "Single" | "Married" | "Divorced" | "Widowed";
  spouseFullName?: string;
  spouseContactPhone?: string;
  numberOfChildren: number;
  childrenDetails: IChild[];
  department: string;
  employeeId: string;
  joinDate: string;
  avatarUrl?: string;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    fullName: { type: String, required: true, default: "Alexander Vance" },
    email: { type: String, required: true, default: "alexander.v@royalpark.lk" },
    roleTitle: { type: String, required: true, default: "Chief Facilities Director" },
    workStatus: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    employmentType: {
      type: String,
      enum: ["Permanent Full-Time", "Contract", "Probation", "Part-Time"],
      default: "Permanent Full-Time",
    },
    civilStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      default: "Married",
    },
    spouseFullName: { type: String, default: "Elena Vance" },
    spouseContactPhone: { type: String, default: "+94 77 123 4567" },
    numberOfChildren: { type: Number, default: 2 },
    childrenDetails: [
      {
        name: { type: String, required: true },
        age: { type: Number, required: true },
      },
    ],
    department: { type: String, default: "Estate Management & Engineering" },
    employeeId: { type: String, default: "RPC-DIR-009" },
    joinDate: { type: String, default: "2019-03-15" },
    avatarUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;
