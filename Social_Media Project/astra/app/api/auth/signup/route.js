import { NextResponse } from "next/server";
import userRepo from "@/Repos/UserRepo";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { email } = await request.json();
    const exists = await userRepo.authEmail(email);
    return NextResponse.json({ exists });
  } catch (error) {
    console.error("Auth API failed:", error);
    return NextResponse.json({ error: "Could not check email." }, { status: 500 });
  }
}