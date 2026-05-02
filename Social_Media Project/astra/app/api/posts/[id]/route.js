import { NextResponse } from "next/server";
import { getById, getByAuthorId, deletePost } from "@/Repos/PostRepo";

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get("authorId");
    const post = authorId ? await getByAuthorId(authorId) : await getById(params.id);
    return NextResponse.json(post);
  } catch (error) {
    console.error("Get post API failed:", error);
    return NextResponse.json({ error: "Could not load post." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await deletePost(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete post API failed:", error);
    return NextResponse.json({ error: "Could not delete post." }, { status: 500 });
  }
}