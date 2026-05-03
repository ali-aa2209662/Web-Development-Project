import { NextResponse } from "next/server";
import postRepo from "@/Repos/PostRepo";

export async function POST(request) {
  try {
    const { userId, postId, commentId } = await request.json();

    const liked = postId
      ? await postRepo.togglePostLike(userId, postId)
      : await postRepo.toggleCommentLike(userId, commentId);

    return NextResponse.json({ liked });
  } catch (error) {
    console.error("Like API failed:", error);
    return NextResponse.json({ error: "Could not toggle like." }, { status: 500 });
  }
}