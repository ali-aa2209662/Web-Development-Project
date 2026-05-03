import { NextResponse } from "next/server";
import userRepo from "@/Repos/UserRepo";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("search");
    const users = query ? await userRepo.search(query) : await userRepo.getAll();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Get users API failed:", error);
    return NextResponse.json({ error: "Could not load users." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const user = await userRepo.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Create user API failed:", error);
    return NextResponse.json({ error: "Could not create user." }, { status: 500 });
  }
}