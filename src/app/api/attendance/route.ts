import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import { defaultAttendanceData } from "@/lib/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    let att = await Attendance.findOne();
    if (!att) {
      att = await Attendance.create(defaultAttendanceData);
    }
    return NextResponse.json({ success: true, data: att, source: "mongodb" });
  } catch (error: any) {
    console.warn("MongoDB fetch warning (Attendance):", error?.message);
    return NextResponse.json({
      success: true,
      data: defaultAttendanceData,
      source: "fallback",
      error: error?.message,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    let att = await Attendance.findOne();
    if (!att) {
      att = await Attendance.create({ ...defaultAttendanceData, ...body });
    } else {
      Object.assign(att, body);
      // Auto-compute compliance status based on threshold limit
      if (att.mtdLateArrivals > att.thresholdLimit) {
        att.complianceStatus = "Policy Breach";
      } else if (att.mtdLateArrivals === att.thresholdLimit) {
        att.complianceStatus = "Watchlist";
      } else {
        att.complianceStatus = "Compliant";
      }
      await att.save();
    }
    return NextResponse.json({ success: true, data: att, source: "mongodb" });
  } catch (error: any) {
    console.error("Attendance update error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update attendance" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, newRecord, thresholdLimit } = await req.json();
    await connectToDatabase();
    let att = await Attendance.findOne();
    if (!att) {
      att = await Attendance.create(defaultAttendanceData);
    }

    if (action === "set_threshold" && typeof thresholdLimit === "number") {
      att.thresholdLimit = thresholdLimit;
      if (att.mtdLateArrivals > att.thresholdLimit) {
        att.complianceStatus = "Policy Breach";
      } else if (att.mtdLateArrivals === att.thresholdLimit) {
        att.complianceStatus = "Watchlist";
      } else {
        att.complianceStatus = "Compliant";
      }
    } else if (action === "log_late_arrival" && newRecord) {
      att.recentRecords.unshift(newRecord);
      att.mtdLateArrivals += 1;
      att.totalMinutesLate += newRecord.delayMinutes || 0;
      if (att.mtdLateArrivals > att.thresholdLimit) {
        att.complianceStatus = "Policy Breach";
      } else if (att.mtdLateArrivals === att.thresholdLimit) {
        att.complianceStatus = "Watchlist";
      }
    }

    await att.save();
    return NextResponse.json({ success: true, data: att, source: "mongodb" });
  } catch (error: any) {
    console.error("Attendance POST error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process attendance" },
      { status: 500 }
    );
  }
}
