import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { defaultProfileData } from "@/lib/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(defaultProfileData);
    }
    return NextResponse.json({ success: true, data: profile, source: "mongodb" });
  } catch (error: any) {
    console.warn("MongoDB fetch warning (Profile):", error?.message);
    return NextResponse.json({
      success: true,
      data: defaultProfileData,
      source: "fallback",
      error: error?.message,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ ...defaultProfileData, ...body });
    } else {
      Object.assign(profile, body);
      await profile.save();
    }
    return NextResponse.json({ success: true, data: profile, source: "mongodb" });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
