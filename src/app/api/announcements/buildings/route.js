import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
import { getProfileIfMember } from "../../_utils";

/**
 * @swagger
 * /api/buildings/announcements:
 *   post:
 *     summary: Send notification to rooms
 *     description: API endpoint that allows the building manager to send notifications to rooms.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - roomId
 *               - content
 *     responses:
 *       '201':
 *         description: Successfully created announcement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 announcement:
 *                   $ref: '#/components/schemas/Announcement'
 *       '400':
 *         description: Missing required fields: roomId, content, or sentById
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Error creating announcement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *     tags:
 *       - Announcements
 * /api/buildings/announcements/fetchrooms:
 *   get:
 *     summary: Fetch rooms with notifications for the manager
 *     description: Fetches the rooms with notifications for the manager of a specific building.
 *     parameters:
 *       - in: query
 *         name: buildingId
 *         required: true
 *         description: The ID of the building.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the list of rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rooms:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Room'
 *       '400':
 *         description: Bad request. No building ID provided or user is not a member of the building.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       '401':
 *         description: Unauthorized. User is not authorized to access the rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       '500':
 *         description: Internal server error. Error occurred while getting rooms by building.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 error:
 *                   type: string
 *                   description: Error details.
 */


export async function POST(request) {
  try {
    const { roomId, content, senderId } = await request.json();

    if (!roomId || !content) {
      return NextResponse.json(
        { message: "Missing required fields: roomId, content, or sentById" },
        { status: 400 }
      );
    }

    const sentById = senderId;

   
    const announcement = await prisma.announcement.create({
      data: {
        content,
        roomId,
        sentById,
        status: 'Active',
      },
    });

    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating announcement", error: error.message },
      { status: 500 }
    );
  }
}




export async function GET(request, context) {
  try {
    const buildingId = request.nextUrl.searchParams.get("buildingId");

    if (!buildingId) {
      return NextResponse.json(
        { message: "No building ID provided" },
        { status: 400 }
      );
    }

    const profile = await getProfileIfMember({
      entityId: buildingId,
      entityType: "building",
    });

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the building" },
        { status: 400 }
      );
    }

    const rooms = await prisma.room.findMany({
      where: {
      buildingId: buildingId,
      },
      include: {
      announcements: {
        where: {
        OR: [
          { sentToId: profile.id },
          { sentById: profile.id }
        ]
        },
        include: {  sentBy: true }
      },
      },
    });

    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting rooms by building", error: error.message }, 
      { status: 500 }
    );
  }
}
