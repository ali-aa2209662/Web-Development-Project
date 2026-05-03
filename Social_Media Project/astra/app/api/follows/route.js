import { NextResponse } from "next/server";
import userRepo from "@/Repos/UserRepo";


  try {
    const { followerId, followingId } = await request.json();
    const following = await userRepo.toggleFollow(followerId, followingId);
    return NextResponse.json({ following });
  } catch (error) {
    console.error("Follow API failed:", error);
    return NextResponse.json({ error: "Could not toggle follow." }, { status: 500 });
  }
