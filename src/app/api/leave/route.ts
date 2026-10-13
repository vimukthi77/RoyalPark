import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Leave from "@/models/Leave";
import { defaultLeaveData } from "@/lib/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    let leave = await Leave.findOne();
    if (!leave) {
      leave = await Leave.create(defaultLeaveData);
    }
    return NextResponse.json({ success: true, data: leave, source: "mongodb" });
  } catch (error: any) {
    console.warn("MongoDB fetch warning (Leave):", error?.message);
    return NextResponse.json({
      success: true,
      data: defaultLeaveData,
      source: "fallback",
      error: error?.message,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    let leave = await Leave.findOne();
    if (!leave) {
      leave = await Leave.create({ ...defaultLeaveData, ...body });
    } else {
      Object.assign(leave, body);
      await leave.save();
    }
    return NextResponse.json({ success: true, data: leave, source: "mongodb" });
  } catch (error: any) {
    console.error("Leave update error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update leave" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, field, delta, newRequest } = await req.json();
    await connectToDatabase();
    let leave = await Leave.findOne();
    if (!leave) {
      leave = await Leave.create(defaultLeaveData);
    }

    if (action === "adjust_counter" && field) {
      const current = (leave as any)[field] || 0;
      const updated = Math.max(0, current + (delta || 0));
      (leave as any)[field] = updated;
    } else if (action === "add_request" && newRequest) {
      leave.leaveHistory.unshift(newRequest);
    }

    await leave.save();
    return NextResponse.json({ success: true, data: leave, source: "mongodb" });
  } catch (error: any) {
    console.error("Leave POST error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to adjust leave" },
      { status: 500 }
    );
  }
}
