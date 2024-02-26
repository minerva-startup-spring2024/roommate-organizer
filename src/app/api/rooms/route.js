import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { checkMembership } from "../_utils";

import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     description: Create a new room and add the user as a member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 roomId:
 *                   type: string
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
 *   get:
 *     summary: Get room details
 *     description: Retrieve details for a specific room
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
 *               $ref: '#/components/schemas/Room'
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
 *    Room:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        metadata:
 *          type: object
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        deletedAt:
 *          type: string
 *        buildingId:
 *          type: string
 *        members:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/RoomMember'
 *    RoomMember:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        role:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        metadata:
 *          type: object
 *        profileImage:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        deletedAt:
 *          type: string
 *        userId:
 *          type: string
 *    Error:
 *      type: object
 *      properties:
 *         message:
 *           type: string
 */


export async function POST(request, context) {
  const roomData = await request.json();
  const roomId = uuidv4();
  const shoppingListId = uuidv4();
  const choreListId = uuidv4();

  if (!roomData.user.id) {
    return NextResponse.json(
      { message: "No user ID provided" },
      { status: 400 }
    );
  }

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
    return NextResponse.error('Failed to create room', { status: 500 });
  } 
}

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

    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
      },
      include: {
        members: true,
      },
    });


    return NextResponse.json({ ...room }, { status: 200 });
  } catch (error) {
    console.log("error getting room", error)
    return NextResponse.json(
      { message: "Error getting room", error: error },
      { status: 500 }
    );
  }
}
