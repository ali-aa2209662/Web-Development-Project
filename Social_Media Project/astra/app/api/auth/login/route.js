import { NextResponse } from "next/server";
import { authEmail } from "@/Repos/UserRepo";

export async function POST(request) {
  const { email } = await request.json();
  const exists = await authEmail(email);
  return NextResponse.json({ exists });
}