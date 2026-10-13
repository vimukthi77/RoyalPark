import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Performance from "@/models/Performance";
import { defaultPerformanceData } from "@/lib/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    let perf = await Performance.findOne();
    if (!perf) {
      perf = await Performance.create(defaultPerformanceData);
    }
    return NextResponse.json({ success: true, data: perf, source: "mongodb" });
  } catch (error: any) {
    console.warn("MongoDB fetch warning (Performance):", error?.message);
    return NextResponse.json({
      success: true,
      data: defaultPerformanceData,
      source: "fallback",
      error: error?.message,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    let perf = await Performance.findOne();
    if (!perf) {
      perf = await Performance.create({ ...defaultPerformanceData, ...body });
    } else {
      Object.assign(perf, body);
      await perf.save();
    }
    return NextResponse.json({ success: true, data: perf, source: "mongodb" });
  } catch (error: any) {
    console.error("Performance update error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update performance" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, index, milestone } = await req.json();
    await connectToDatabase();
    let perf = await Performance.findOne();
    if (!perf) {
      perf = await Performance.create(defaultPerformanceData);
    }

    if (action === "toggle_milestone" && typeof index === "number") {
      if (perf.milestonesAchieved[index]) {
        perf.milestonesAchieved[index].achieved = !perf.milestonesAchieved[index].achieved;
      }
    } else if (action === "add_milestone" && milestone) {
      perf.milestonesAchieved.push(milestone);
    }

    await perf.save();
    return NextResponse.json({ success: true, data: perf, source: "mongodb" });
  } catch (error: any) {
    console.error("Performance POST error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update milestone" },
      { status: 500 }
    );
  }
}
