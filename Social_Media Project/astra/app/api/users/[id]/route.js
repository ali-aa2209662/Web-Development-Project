import { NextResponse } from "next/server";
import userRepo from "@/Repos/UserRepo";

export async function GET(request, { params }) {
  try {
    const user = await userRepo.getById(params.id);
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Get user API failed:", error);
    return NextResponse.json({ error: "Could not load user." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const user = await userRepo.update(params.id, body);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Update user API failed:", error);
    return NextResponse.json({ error: "Could not update user." }, { status: 500 });
  }
}