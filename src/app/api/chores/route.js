import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { checkMembership } from "../_utils";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/chores:
 *   get:
 *     summary: Get chore list
 *     description: Retrieve the chore list for a specific room
 *     parameters:
 *       - in: query
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the room
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChoreList'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   post:
 *     summary: Create a new chore
 *     description: Create a new chore and add it to the chore list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                assignedToId:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChoreListItem'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete a chore
 *     description: Delete a chore from the chore list
 *
 * components:
 *  schemas:
 *    ChoreList:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        choreListItems:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ChoreListItem'
 *    Error:
 *      type: object
 *      properties:
 *         message:
 *           type: string
 *    ChoreListItem:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        status:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        assignedToId:
 *          type: string
 *        createdById:
 *          type: string
 */

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
    const supabase = createServerComponentClient({ cookies });
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    await checkMembership(roomId, user.id);

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
