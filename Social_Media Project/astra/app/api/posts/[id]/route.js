import { NextResponse } from "next/server";
import { getById, getByAuthorId, delete } from "@/Repos/PostRepo";

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  const post = authorId ? await getByAuthorId(authorId) : await getById(params.id);
  return NextResponse.json(post);
}

export async function DELETE(request, { params }) {
  await deletePost(params.id);
  return NextResponse.json({ success: true });
}