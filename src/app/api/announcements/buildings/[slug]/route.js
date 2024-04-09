import { getProfileIfMember } from "@/app/api/_utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/building/announcements/{announcementId}:
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
 *                 type: string
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

 
  const announcementId = context.params.slug;


    try {

        const announcement = await prisma.announcement.findUnique({
            where: {
              id: announcementId,
            }
          });
      
        if (!announcement) {
            return NextResponse.json({ message: "Announcement not found" }, { status: 404 });
        }

        const profile = await getProfileIfMember({
            entityId: announcement.room.buildingId,
            entityType: "building",
          });
  
  
      if (!profile) {
        return NextResponse.json(
          { message: "User is not a member of the building" },
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
          announcement: updateAnnouncement,
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
        
        const announcementId = context.params.slug;
        try {


            const announcement = await prisma.announcement.findUnique({
                where: {
                  id: announcementId,
                }
              });
          
            if (!announcement) {
                return NextResponse.json({ message: "Announcement not found" }, { status: 404 });
            }
    
            const profile = await getProfileIfMember({
                entityId: announcement.room.buildingId,
                entityType: "building",
              });
      
      
          if (!profile) {
            return NextResponse.json(
              { message: "User is not a member of the building" },
              { status: 400 }
            );
          }    

          await prisma.announcement.deleteMany({
            where: {
                id: announcementId,
                sentBy: {
                    equals: profile.id
                }
            }
            });

            return NextResponse.json(
                { message: "Deleted announcement" },
                { status: 200 }
            );
        } catch (error) {
            return NextResponse.json(
                { message: "Error deleting announcement", error: error },
                { status: 500 }
            );
        }
    }

