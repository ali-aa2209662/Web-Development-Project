import { NextResponse } from "next/server";
import postRepo from "@/Repos/PostRepo";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get("authorId");
    const post = authorId ? await postRepo.getByAuthorId(authorId) : await postRepo.getById(params.id);
    return NextResponse.json(post);
  } catch (error) {
    console.error("Get post API failed:", error);
    return NextResponse.json({ error: "Could not load post." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await postRepo.deletePost(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete post API failed:", error);
    return NextResponse.json({ error: "Could not delete post." }, { status: 500 });
  }
}