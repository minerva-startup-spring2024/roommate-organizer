import { NextResponse } from "next/server";

import { getProfile, getProfileIfMember } from "@/app/api/_utils";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET(request, context) {
  try {
    const profile = await getProfile();

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const messages = await prisma.announcement.findMany({
      where: {
        OR: [
          { sentById: { equals: profile.id } },
          { sentToId: { equals: profile.id } },
        ],
        NOT: { sentToId: null },
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error getting messages", error: error },
      { status: 500 }
    );
  }
}

export async function POST(request, context) {
  const { data, roomId } = await request.json();

  if (!roomId) {
    return NextResponse.json(
      { message: "No room id provided" },
      { status: 400 }
    );
  }

  try {
    const profile = await getProfileIfMember({
      entityId: roomId,
      entityType: "room",
    });

    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        members: true,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const roomManager = room.members.find(
      (member) => member.role === "MANAGER"
    );

    const announcement = await prisma.announcement.create({
      data: {
        content: data.content,
        room: {
          connect: { id: roomId },
        },
        sentBy: {
          connect: { id: profile.id },
        },
        sentTo: {
          connect: { id: roomManager.id },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Created message",
        announcement: announcement,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating message", error: error },
      { status: 500 }
    );
  }
}
