import { NextResponse } from "next/server";
import userRepo from "@/Repos/UserRepo";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || params.id;
    if (!id) return NextResponse.json({ error: "User ID required." }, { status: 400 });
    const user = await userRepo.getById(id);
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Get user API failed:", error);
    return NextResponse.json({ error: "Could not load user." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || params.id;
    if (!id) return NextResponse.json({ error: "User ID required." }, { status: 400 });
    const body = await request.json();
    const user = await userRepo.update(id, body);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Update user API failed:", error);
    return NextResponse.json({ error: "Could not update user." }, { status: 500 });
  }
}