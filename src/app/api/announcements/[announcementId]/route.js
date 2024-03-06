import { NextResponse } from "next/server";
import { getProfileIfMember } from "../../_utils";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/announcements/{announcementId}:
 *   patch:
 *     tags:
 *       - Announcements
 *     summary: Update an announcement
 *     description: Update an announcement
 *     parameters:
 *       - in: path
 *         name: announcementId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the announcement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               status:
 *                 type: String
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
 *   delete:
 *     tags:
 *       - Announcements
 *     summary: Delete an announcement
 *     description: Delete an announcement
 *     parameters:
 *       - in: path
 *         name: announcementId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the announcement
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
 *
 * components:
 *    schemas:
 *      announcement:
 *          type: object
 *          properties:
 *          id:
 *              type: string
 *          content:
 *              type: optional string 
 *          status: 
 *              type: optional string
 *          metadata:
 *              type: Json
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 *          roomId:
 *              type: String
 *          sentById:
 *              type: String
 *      Error:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 */

export async function PATCH(request, context) {
  const data = await request.json();
  try {
    const announcementId = context.params.announcementId;

    const announcement = await prisma.announcement.findUnique({
      where: {
        id: announcementId,
      },
      include: {
        roomId: true,
      },
    });

    if (!announcement) {
      return NextResponse.json({ message: "Announcement not found" }, { status: 404 });
    }

    const profile = await getProfileIfMember( announcement.roomId );

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const updateAnnouncement = await prisma.announcement.update({
      where: {
        id: announcementId,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json(
      {
        message: "Updated announcement",
        announcement: announcement,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating announcement", error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const announcementId = context.params.announcementId;

    const announcement = await prisma.announcement.findUnique({
      where: {
        id: announcementId,
      },
      include: {
        roomId: true,
      },
    });

    if (!announcement) {
      return NextResponse.json({ message: "Announcement not found" }, { status: 404 });
    }

    const profile = await getProfileIfMember(announcement.roomId);

    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the room" },
        { status: 400 }
      );
    }

    const deleteAnnouncement = await prisma.announcement.update({
      where: {
        id: announcementId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Deleted announcement",
        announcement: deleteAnnouncement,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting announcement", error: error },
      { status: 500 }
    );
  }
}
