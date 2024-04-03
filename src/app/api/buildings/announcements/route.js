import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db";
import { getProfile } from "../../_utils";

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
 */


export async function POST(request) {
  try {
    const { roomId, content } = await request.json();

    console.log(`print this is the room id: ${roomId}`);

    if (!roomId || !content) {
      return NextResponse.json(
        { message: "Missing required fields: roomId, content, or sentById" },
        { status: 400 }
      );
    }

    const sender = await getProfile();
    const sentById = sender.id;
    console.log(`print this is the sender: ${sentById}`);
    console.log(`print this is the profile: ${sender.firstName}`);
    const announcement = await prisma.announcement.create({
      data: {
        content,
        roomId,
        sentById,
        status: 'unread',
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


