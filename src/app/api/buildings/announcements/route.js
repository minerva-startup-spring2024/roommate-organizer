import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
import { getProfileIfMember } from "../../_utils";

export async function POST(request) {
  try {
    

    const { roomId, content } = await request.json();

    
    if (!roomId || !content) {
      return NextResponse.json(
        { message: "Missing required fields: roomId, content, or sentById" },
        { status: 400 }
      );

    }

    const  sender  = await getProfileIfMember(roomId);

    console.log(`print this is the ${sender.id}`)

    const sentById = sender.id

    const profile = await prisma.profile.findUnique({
      where: { id: sentById},
      include: { rooms: true },
    });

    if (!profile || !profile.rooms.some(room => room.id === roomId)) {
      return NextResponse.json(
        { message: "User is not authorized to post in this room" },
        { status: 403 }
      );
    }

   
    const announcement = await prisma.announcement.create({
      data: {
        content,
        roomId,
        sentById,
      },
    });

    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating announcement", error: error.message },
      { status: 500 }
    );
  }
}
