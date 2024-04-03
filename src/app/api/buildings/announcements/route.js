import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
import { getProfile } from "../../_utils";

export async function POST(request) {
  try {
    

    const { roomId, content } = await request.json();

    console.log(`print this is thexvxvxvxvx room id  ${roomId}`)

    
    if (!roomId || !content) {
      return NextResponse.json(
        { message: "Missing required fields: roomId, content, or sentById" },
        { status: 400 }
      );

    }

    const  sender  = await getProfile();
    const sentById = sender.id
    console.log(`print this is the sender ${sentById}`)
    console.log(`print this is the profile ${sender.firstName}`)
    const announcement = await prisma.announcement.create({
      data: {
        content,
        roomId,
        sentById,
        status:'unread',
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


export async function GET(request) {
  try {
    const profile = await getProfile();
    if (!profile || profile.role !== 'MANAGER') {
      return NextResponse.json(
        { message: "You are not authorized to access this page" },
        { status: 401 }
      );
    }

    const managerProfile = await prisma.profile.findFirst({
      where: {
        role: 'MANAGER',
      },
    });

    const announcements = await prisma.announcement.findMany({
      where: {
        sentTo: managerProfile.id,
      },
    });

    return NextResponse.json({ announcements }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching announcements", error: error.message },
      { status: 500 }
    );
  }
}
