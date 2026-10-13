import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Payroll from "@/models/Payroll";
import { defaultPayrollData } from "@/lib/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    let payroll = await Payroll.findOne();
    if (!payroll) {
      payroll = await Payroll.create(defaultPayrollData);
    }
    return NextResponse.json({ success: true, data: payroll, source: "mongodb" });
  } catch (error: any) {
    console.warn("MongoDB fetch warning (Payroll):", error?.message);
    return NextResponse.json({
      success: true,
      data: defaultPayrollData,
      source: "fallback",
      error: error?.message,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    let payroll = await Payroll.findOne();
    if (!payroll) {
      payroll = await Payroll.create({ ...defaultPayrollData, ...body });
    } else {
      Object.assign(payroll, body);
      await payroll.save();
    }
    return NextResponse.json({ success: true, data: payroll, source: "mongodb" });
  } catch (error: any) {
    console.error("Payroll update error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update payroll" },
      { status: 500 }
    );
  }
}
