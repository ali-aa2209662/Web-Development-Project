import { NextResponse } from "next/server";
import postRepo from "@/Repos/PostRepo";
export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  try {
    await postRepo.deleteComment(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete comment API failed:", error);
    return NextResponse.json({ error: "Could not delete comment." }, { status: 500 });
  }
}