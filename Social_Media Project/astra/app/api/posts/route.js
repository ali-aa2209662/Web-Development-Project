import { NextResponse } from "next/server";
import { getAll, create } from "@/Repos/PostRepo";

export async function GET(request) {
  try {
  
  const posts = await getAll();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Messages API failed:", error);
    return NextResponse.json({ error: "Could not load messages." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
   const { authorId, content } = await request.json();
  const post = await create(authorId, content);
    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error("Create message API failed:", error);
    return NextResponse.json({ error: "Could not create message." }, { status: 500 });
  }
}
