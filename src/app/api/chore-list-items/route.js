import { NextResponse } from "next/server";

import { getProfileIfMember } from "@/app/api/_utils";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/chore-list-items:
 *   get:
 *     tags:
 *       - Chore List Items
 *     summary: Get room's chores
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
 *     tags:
 *       - Chore List Items
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
  const roomId = request.nextUrl.searchParams.get("roomId");
  try {
    const profile = await getProfileIfMember({
      entityId: roomId,
      entityType: "room",
    });

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const choreList = await prisma.choreList.findUnique({
      where: {
        roomId: roomId,
      },
      include: {
        choreListItems: {
          where: {
            deletedAt: null,
          },
          include: { assignedTo: true, createdBy: true },
        },
      },
    });

    return NextResponse.json({ ...choreList }, { status: 200 });
  } catch (error) {
    if (!roomId) {
      return NextResponse.json(
        { message: "No room id provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error getting chore list", error: error },
      { status: 500 }
    );
  }
}

export async function POST(request, context) {
  const { roomId, data } = await request.json();

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

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const choreList = await prisma.choreList.findFirst({
      where: { roomId: roomId },
    });

    const createchoreListItem = await prisma.choreListItem.create({
      data: {
        choreListId: choreList.id,
        name: data.name,
        createdById: profile.id,
        assignedToId: data.assignedToId || null,
      },
    });

    return NextResponse.json(
      {
        message: "Created item",
        choreListItem: createchoreListItem,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating item", error: error },
      { status: 500 }
    );
  }
}
