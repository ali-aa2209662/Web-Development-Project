import { NextResponse } from "next/server";
import postRepo from "@/Repos/PostRepo";

export async function GET() {
  try {
    const posts = await postRepo.getAll();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Get posts API failed:", error);
    return NextResponse.json({ error: "Could not load posts." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { authorId, content } = await request.json();
    const post = await postRepo.createPost(authorId, content);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create post API failed:", error);
    return NextResponse.json({ error: "Could not create post." }, { status: 500 });
  }
}