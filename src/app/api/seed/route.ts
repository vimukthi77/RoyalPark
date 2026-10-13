import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Payroll from "@/models/Payroll";
import Qualifications from "@/models/Qualifications";
import Training from "@/models/Training";
import Performance from "@/models/Performance";
import Leave from "@/models/Leave";
import Attendance from "@/models/Attendance";
import Disciplinary from "@/models/Disciplinary";
import {
  defaultProfileData,
  defaultPayrollData,
  defaultQualificationsData,
  defaultTrainingData,
  defaultPerformanceData,
  defaultLeaveData,
  defaultAttendanceData,
  defaultDisciplinaryData,
} from "@/lib/mockData";

export async function POST() {
  try {
    await connectToDatabase();

    await Promise.all([
      Profile.deleteMany({}),
      Payroll.deleteMany({}),
      Qualifications.deleteMany({}),
      Training.deleteMany({}),
      Performance.deleteMany({}),
      Leave.deleteMany({}),
      Attendance.deleteMany({}),
      Disciplinary.deleteMany({}),
    ]);

    const [profile, payroll, qualifications, training, performance, leave, attendance, disciplinary] =
      await Promise.all([
        Profile.create(defaultProfileData),
        Payroll.create(defaultPayrollData),
        Qualifications.create(defaultQualificationsData),
        Training.create(defaultTrainingData),
        Performance.create(defaultPerformanceData),
        Leave.create(defaultLeaveData),
        Attendance.create(defaultAttendanceData),
        Disciplinary.create(defaultDisciplinaryData),
      ]);

    return NextResponse.json({
      success: true,
      message: "Royal Park Condominium MongoDB database seeded successfully!",
      data: {
        profile,
        payroll,
        qualifications,
        training,
        performance,
        leave,
        attendance,
        disciplinary,
      },
    });
  } catch (error: any) {
    console.error("Database seed error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}
