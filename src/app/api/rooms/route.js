import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request, context) {
  const roomData = await request.json();
  const roomId = uuidv4();

  // TODO: turn this call into a single transaction
  const newRoom = await prisma.room.create({
    data: {
      id: roomId,
      name: roomData.name,
      members: {
        // Connect the profile to the room
        connect: { id: roomData.user.id },
      },
    },
  });

  // Link user to the new room
  const updatedProfile = await prisma.profile.update({
    where: { id: roomData.user.id }, 
    data: {
      rooms: {
        connect: { id: roomId },
      },
    },
  });

  // Create shopping list for the room
  const shoppingList = await prisma.shoppingList.create({
    data: {
      roomId: roomId,
    },
  });

  // Create chore list for the room
  const choreList = await prisma.choreList.create({
    data: {
      roomId: roomId,
    },
  });

  const updatedRoom = await prisma.room.update({
    where: { id: roomId },
    data: {
      shoppingLists: {
        connect: { id: shoppingList.id },
      },
      choreLists: {
        connect: { id: choreList.id },
      },
    },
  });

  return NextResponse.json(
    { message: "Created room", room: newRoom },
    { status: 200 }
  );
}

export async function DELETE(request, context) {
  const { id } = await request.json();

  // TODO: delete all related shopping lists and chore lists

  const deleteRoom = await prisma.room.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(
    { message: "Deleted chore", chore: newRoom },
    { status: 200 }
  );
}
