import { NextResponse } from "next/server";
import { getById , update } from "@/Repos/UserRepo";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const user = await getById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get user API failed:", error);
    return NextResponse.json({ error: "Could not load user." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const user = await update(id, body);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Update user API failed:", error);
    return NextResponse.json({ error: "Could not update user." }, { status: 500 });
  }
}
