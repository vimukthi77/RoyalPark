import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Disciplinary from "@/models/Disciplinary";
import { defaultDisciplinaryData } from "@/lib/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    let disc = await Disciplinary.findOne();
    if (!disc) {
      disc = await Disciplinary.create(defaultDisciplinaryData);
    }
    return NextResponse.json({ success: true, data: disc, source: "mongodb" });
  } catch (error: any) {
    console.warn("MongoDB fetch warning (Disciplinary):", error?.message);
    return NextResponse.json({
      success: true,
      data: defaultDisciplinaryData,
      source: "fallback",
      error: error?.message,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { action, warningLetter, warningId, logEntry } = await req.json();
    await connectToDatabase();
    let disc = await Disciplinary.findOne();
    if (!disc) {
      disc = await Disciplinary.create(defaultDisciplinaryData);
    }

    if (action === "issue_warning" && warningLetter) {
      disc.warningLetters.unshift(warningLetter);
    } else if (action === "append_log" && warningId && logEntry) {
      const warning = disc.warningLetters.find((w) => w.warningId === warningId);
      if (warning) {
        warning.actionLogs.push(logEntry);
      } else {
        return NextResponse.json(
          { success: false, error: "Warning record not found" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    }

    await disc.save();
    return NextResponse.json({ success: true, data: disc, source: "mongodb" });
  } catch (error: any) {
    console.error("Disciplinary POST error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process disciplinary action" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { warningId, status, severity } = await req.json();
    await connectToDatabase();
    let disc = await Disciplinary.findOne();
    if (!disc) {
      disc = await Disciplinary.create(defaultDisciplinaryData);
    }

    const warning = disc.warningLetters.find((w) => w.warningId === warningId);
    if (!warning) {
      return NextResponse.json({ success: false, error: "Warning not found" }, { status: 404 });
    }

    if (status) warning.status = status;
    if (severity) warning.severity = severity;

    await disc.save();
    return NextResponse.json({ success: true, data: disc, source: "mongodb" });
  } catch (error: any) {
    console.error("Disciplinary PUT error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update warning" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const warningId = searchParams.get("warningId");

    if (!warningId) {
      return NextResponse.json(
        { success: false, error: "Missing warningId" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    let disc = await Disciplinary.findOne();
    if (!disc) {
      disc = await Disciplinary.create(defaultDisciplinaryData);
    }

    disc.warningLetters = disc.warningLetters.filter((w) => w.warningId !== warningId);
    await disc.save();

    return NextResponse.json({ success: true, data: disc, source: "mongodb" });
  } catch (error: any) {
    console.error("Disciplinary DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete warning" },
      { status: 500 }
    );
  }
}
