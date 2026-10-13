import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILoans {
  totalLoans: number;
  pendingLoans: number;
  remainingBalance: number;
  monthlyDeduction: number;
}

export interface IOvertime {
  singleOTHours: number;
  doubleOTHours: number;
  estOTPaid: number;
}

export interface IPayroll extends Document {
  annualBaseSalary: number;
  targetAnnualBonus: number;
  currency: string;
  loans: ILoans;
  overtime: IOvertime;
  taxBracketPercentage: number;
  providentFundPercentage: number;
  updatedAt: Date;
}

const PayrollSchema = new Schema<IPayroll>(
  {
    annualBaseSalary: { type: Number, required: true, default: 96000 },
    targetAnnualBonus: { type: Number, required: true, default: 18000 },
    currency: { type: String, default: "USD" },
    loans: {
      totalLoans: { type: Number, default: 15000 },
      pendingLoans: { type: Number, default: 1 },
      remainingBalance: { type: Number, default: 8500 },
      monthlyDeduction: { type: Number, default: 650 },
    },
    overtime: {
      singleOTHours: { type: Number, default: 14 },
      doubleOTHours: { type: Number, default: 6 },
      estOTPaid: { type: Number, default: 1350 },
    },
    taxBracketPercentage: { type: Number, default: 12 },
    providentFundPercentage: { type: Number, default: 8 },
  },
  { timestamps: true }
);

const Payroll: Model<IPayroll> =
  mongoose.models.Payroll || mongoose.model<IPayroll>("Payroll", PayrollSchema);

export default Payroll;
