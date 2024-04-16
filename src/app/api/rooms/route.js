import { getProfile, getProfileIfMember } from "@/app/api/_utils";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     tags:
 *       - Rooms
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
 *     tags:
 *       - Rooms
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
 *            $ref: '#/components/schemas/Profile'
 *    Profile:
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
  const profile = await getProfile();
  const managerProfile = await prisma.profile.findFirst({
    where: {
      role: "MANAGER"
    }
  });

  try {
    if (roomData.buildingId) {
      const room = await prisma.room.create({
        data: {
          name: roomData.name,
          members: {
            connect:[ { id: profile.id }, { id: managerProfile.id }],
            },
          building: {
            connect: { id: roomData.buildingId },
          },
          shoppingLists: {
            create: {},
          },
          choreLists: {
            create: {},
          },
        },
      });
    }

    // const room = await prisma.room.create({
    //   data: {
    //     name: roomData.name,
    //     members: {
    //       connect: { id: profile.id },
    //     },
    //     shoppingLists: {
    //       create: {},
    //     },
    //     choreLists: {
    //       create: {},
    //     },
    //   },
    // });

    return NextResponse.json(
      { message: "Created room", room: room },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.error("Failed to create room", { status: 500 });
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

    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        members: true,
        announcements: true,
        shoppingLists: {
          include: {
            shoppingListItems: {
              include: { assignedTo: true, createdBy: true },
            },
          },
        },
        choreLists: {
          include: {
            choreListItems: { include: { assignedTo: true, createdBy: true } },
          },
        },
      },
    });

    return NextResponse.json({ ...room }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting room", error: error },
      { status: 500 }
    );
  }
}
