import { NextResponse } from "next/server";

import prisma from "../../../../lib/db";
import { getProfileIfMember } from "../_utils";

export const dynamic = "force-dynamic";


/**
 * @swagger
 * /api/announcements:
 *   get:
 *     tags:
 *      - Announcements
 *     summary: Get room's announcements
 *     description: Retrieve all announcements for a specific room
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
 *               $ref: '#/components/schemas/announcement'
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
*   post:
 *     tags:
 *      - Announcements
 *     summary: Create a new announcement
 *     description: Create a new announcement and add it to a roomId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                roomId:
 *                  type: string
 *                data:
 *                  type: object
 *                  properties:
 *                    content:
 *                      type: string
 *                    status:
 *                      type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/shoppingListItem'
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
 * components:
 *  schemas:
 *    announcement:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        content:
 *          type: optional string 
 *        status: 
 *          type: optional string
 *        metadata:
 *          type: Json
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        roomId:
 *          type: String
 *        sentById:
 *          type: String
 *    Error:
 *      type: object
 *      properties:
 *         message:
 *           type: string
 *    shoppingListItem:
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
      const profile = await getProfileIfMember(roomId);
  
      if (!profile) {
        return NextResponse.json(
          { message: "User is not a member of the room" },
          { status: 400 }
        );
      }
  
      const announcements = await prisma.announcement.findMany({
        where: {
          roomId: roomId,
        }
      });
  
      return NextResponse.json({ ...announcements }, { status: 200 });
    } catch (error) {
      if (!roomId) {
        return NextResponse.json(
          { message: "No room id provided" },
          { status: 400 }
        );
      }
  
      return NextResponse.json(
        { message: "Error getting announcements", error: error },
        { status: 500 }
      );
    }
  }


export async function POST(request) {
    const { senderId, content, toManager ,roomId } = await request.json();
  
    if (!senderId) {
      return NextResponse.json(
        { message: "No user provided" },
        { status: 400 }
      );
    }


    console.log(senderId)
  
    try {
      let sentToId; 
      const sentById=senderId
      if(toManager){
        const managerProfile = await prisma.profile.findFirst({
          where: {
            role: "MANAGER",
          },
        });
      if (managerProfile) {
        sentToId = managerProfile.id;
      } else {
        return NextResponse.json(
          { message: "Manager not found" },
          { status: 404 }
        );
      }
      };

      console.log(content, roomId)

     
  
      const createAnnouncement = await prisma.announcement.create({
        data: {
          content,
          roomId,
          sentById,
          status: "unread",
          sentToId,

        },
      });
  
      return NextResponse.json(
        {
          message: "Created announcement",
          announcement: createAnnouncement,
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