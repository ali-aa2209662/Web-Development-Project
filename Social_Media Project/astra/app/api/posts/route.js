import { NextResponse } from "next/server";
import { createMessage, getFeedMessages, getMessagesByUserId } from "@/data-repository";

export async function GET(request) {
  try {
  

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Messages API failed:", error);
    return NextResponse.json({ error: "Could not load messages." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
   
    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error("Create message API failed:", error);
    return NextResponse.json({ error: "Could not create message." }, { status: 500 });
  }
}
