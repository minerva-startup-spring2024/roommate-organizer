import { NextResponse } from "next/server";

import prisma from "@/../lib/db";
import { getProfileIfMember } from "@/app/api/_utils";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/rooms/[slug]:
 *   post:
 *     summary: Add user to existing room
 *     description: Add another user to an existing room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: The ID of the room
 *               profileId:
 *                 type: string
 *                 description: The ID of the profile to add
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

export async function GET(request, context) {
  const roomId = context.params.slug;
  try {
    const profile = await getProfileIfMember(roomId);

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const roomWithMembers = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        members: true,
      },
    });

    return NextResponse.json(
      {
        members: roomWithMembers.members,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting room members:", error);
    return NextResponse.error("Error getting room members", { status: 500 });
  }
}

export async function POST(request, context) {
  const roomId = context.params.slug;
  try {
    const { profileId } = await request.json();

    if (!roomId || !profileId) {
      return NextResponse.json(
        { message: "Both roomId and userId are required" },
        { status: 400 }
      );
    }

    const inviter = await getProfileIfMember(roomId);

    if (!inviter) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    await prisma.room.update({
      where: { id: roomId },
      data: {
        members: {
          connect: { id: profileId },
        },
      },
    });

    return NextResponse.json(
      { message: "User added to the room successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding user to room:", error);
    return NextResponse.error("Failed to add user to room", { status: 500 });
  }
}
