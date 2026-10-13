import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Training from "@/models/Training";
import { defaultTrainingData } from "@/lib/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    let training = await Training.findOne();
    if (!training) {
      training = await Training.create(defaultTrainingData);
    }
    return NextResponse.json({ success: true, data: training, source: "mongodb" });
  } catch (error: any) {
    console.warn("MongoDB fetch warning (Training):", error?.message);
    return NextResponse.json({
      success: true,
      data: defaultTrainingData,
      source: "fallback",
      error: error?.message,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    let training = await Training.findOne();
    if (!training) {
      training = await Training.create({ ...defaultTrainingData, ...body });
    } else {
      Object.assign(training, body);
      await training.save();
    }
    return NextResponse.json({ success: true, data: training, source: "mongodb" });
  } catch (error: any) {
    console.error("Training update error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update training" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, payload } = await req.json();
    await connectToDatabase();
    let training = await Training.findOne();
    if (!training) {
      training = await Training.create(defaultTrainingData);
    }

    if (action === "add_course") {
      training.ongoingCourses.push(payload);
    } else if (action === "update_compliance_status") {
      const idx = training.mandatoryCompliance.findIndex((c) => c.name === payload.name);
      if (idx !== -1) {
        training.mandatoryCompliance[idx].status = payload.status;
      }
    } else if (action === "add_credits") {
      training.earnedCredits += payload.amount || 1;
    }

    await training.save();
    return NextResponse.json({ success: true, data: training, source: "mongodb" });
  } catch (error: any) {
    console.error("Training POST error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to perform training action" },
      { status: 500 }
    );
  }
}
