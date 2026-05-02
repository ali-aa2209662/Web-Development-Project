import { NextResponse } from "next/server";
import postRepo from "@/Repos/PostRepo";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { authorId, postId, content } = await request.json();
    const comment = await postRepo.createComment(authorId, postId, content);
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Create comment API failed:", error);
    return NextResponse.json({ error: "Could not create comment." }, { status: 500 });
  }
}