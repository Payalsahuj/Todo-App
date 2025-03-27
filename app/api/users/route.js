import { NextResponse } from "next/server";
import User from "@/model/User";
import connectDB from "@/lib/connectDB";

export async function GET(request) {
  try {
    await connectDB();

    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
