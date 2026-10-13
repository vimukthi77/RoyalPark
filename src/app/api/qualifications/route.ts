import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Qualifications from "@/models/Qualifications";
import { defaultQualificationsData } from "@/lib/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    let quals = await Qualifications.findOne();
    if (!quals) {
      quals = await Qualifications.create(defaultQualificationsData);
    }
    return NextResponse.json({ success: true, data: quals, source: "mongodb" });
  } catch (error: any) {
    console.warn("MongoDB fetch warning (Qualifications):", error?.message);
    return NextResponse.json({
      success: true,
      data: defaultQualificationsData,
      source: "fallback",
      error: error?.message,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { type, item } = await req.json(); // type: 'degree' | 'certification'
    await connectToDatabase();
    let quals = await Qualifications.findOne();
    if (!quals) {
      quals = await Qualifications.create(defaultQualificationsData);
    }

    if (type === "degree") {
      quals.educationalDegrees.push(item);
    } else if (type === "certification") {
      quals.certifications.push(item);
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid qualification type" },
        { status: 400 }
      );
    }

    await quals.save();
    return NextResponse.json({ success: true, data: quals, source: "mongodb" });
  } catch (error: any) {
    console.error("Qualifications POST error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to add qualification" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // 'degree' | 'certification'
    const index = parseInt(searchParams.get("index") || "-1", 10);

    if (index < 0 || !type) {
      return NextResponse.json({ success: false, error: "Invalid parameters" }, { status: 400 });
    }

    await connectToDatabase();
    let quals = await Qualifications.findOne();
    if (!quals) {
      quals = await Qualifications.create(defaultQualificationsData);
    }

    if (type === "degree") {
      quals.educationalDegrees.splice(index, 1);
    } else if (type === "certification") {
      quals.certifications.splice(index, 1);
    }

    await quals.save();
    return NextResponse.json({ success: true, data: quals, source: "mongodb" });
  } catch (error: any) {
    console.error("Qualifications DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete qualification" },
      { status: 500 }
    );
  }
}
