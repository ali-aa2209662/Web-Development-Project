import { NextResponse } from "next/server";
import { getAll, create } from "@/Repos/UserRepo";

export async function GET() {
  try {
    const users = await getAll()
    return NextResponse.json(users)
  } catch (error) {
    console.error("Get user API failed:", error);
    return NextResponse.json({ error: "Could not load user." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const user = await create(body)
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}