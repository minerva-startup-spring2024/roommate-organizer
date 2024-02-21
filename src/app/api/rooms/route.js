import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request, context) {
  const roomData = await request.json();
  const roomId = uuidv4();
  const shoppingListId = uuidv4();
  const choreListId = uuidv4();

  // Single transaction to create a room
  try {
    await prisma.$transaction([

      // Create room
      prisma.room.create({
        data: {
          id: roomId,
          name: roomData.name,
          members: {
            // Connect the profile to the room
            connect: { id: roomData.user.id },
          },
        },
      }),

      // Link user to the new room
      prisma.profile.update({
        where: { id: roomData.user.id }, 
        data: {
          rooms: {
            connect: { id: roomId },
          },
        },
      }),

      // Create shopping list for the room
      prisma.shoppingList.create({
        data: {
          id: shoppingListId,
          roomId: roomId,
        },
      }),

      // Create chore list for the room
      prisma.choreList.create({
        data: {
          id: choreListId,
          roomId: roomId,
        },
      }),

      // Link room to shopping and chore lists
      prisma.room.update({
        where: { id: roomId },
        data: {
          shoppingLists: {
            connect: { id: shoppingListId },
          },
          choreLists: {
            connect: { id: choreListId },
          },
        },
      })
    ]);

    return NextResponse.json(
      { message: "Created room", roomId: roomId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.error('Failed to create room', { status: 500 });
  } 
}
