import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request, context) {
  const roomData = await request.json();
  const roomId = uuidv4();
  console.log("RoomID:", roomId)

  const createRoom = await prisma.room.create({
    data: {
      // id: roomId,
      name: roomData.name,
      shoppingLists: roomData.shoppingLists,
      choreLists: roomData.choreLists,
      members: roomData.members
    },
  });

  return NextResponse.json(
    { message: "Created room", room: createRoom },
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
    { message: "Deleted chore", chore: deleteChore },
    { status: 200 }
  );
}
