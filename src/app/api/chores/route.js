import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request, context) {
  const choreData = await request.json();

  const createChore = await prisma.choreListItem.create({
    data: {
      id: uuidv4(),
      choreListId: choreData.choreListId,
      addedById: choreData.addedById,
      name: choreData.name,
      description: choreData.description,
    },
  });

  return NextResponse.json(
    { message: "Created chore", chore: createChore },
    { status: 200 }
  );
}

export async function DELETE(request, context) {
  const { id } = await request.json();

  const deleteChore = await prisma.choreListItem.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(
    { message: "Deleted chore", chore: deleteChore },
    { status: 200 }
  );
}
