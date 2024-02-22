import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { checkMembership } from "../_utils";

export const dynamic = "force-dynamic";

export async function GET(request, context) {
  try {
    const roomId = request.nextUrl.searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json(
        { message: "No room ID provided" },
        { status: 400 }
      );
    }

    const supabase = createServerComponentClient({ cookies });
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    await checkMembership(roomId, user.id);

    const choreList = await prisma.choreList.findFirst({
      where: {
        roomId: roomId,
      },
      include: {
        choreListItems: true,
      },
    });

    return NextResponse.json({ ...choreList }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting chores", error: error },
      { status: 500 }
    );
  }
}

export async function POST(request, context) {
  const { name, assignedToId, roomId } = await request.json();

  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    await checkMembership(roomId, user.id);

    const profile = await prisma.profile.findFirst({
      where: { userId: user.id },
    });

    const choreList = await prisma.choreList.findFirst({
      where: { roomId: roomId },
    });

    const createChore = await prisma.choreListItem.create({
      data: {
        choreListId: choreList.id,
        name: name,
        createdById: profile.id,
        assignedToId: assignedToId || null,
      },
    });

    return NextResponse.json(
      { message: "Created chore", chore: createChore },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating chore", error: error },
      { status: 500 }
    );
  }
}

export async function PATCH(request, context) {
  const { id, data } = await request.json();
  try {
    const updateChore = await prisma.choreListItem.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json(
      { message: "Updated chore", chore: updateChore },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating chore", error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  const { id } = await request.json();

  try {
    const deleteChore = await prisma.choreListItem.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Deleted chore", chore: deleteChore },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting chore", error: error },
      { status: 500 }
    );
  }
}
