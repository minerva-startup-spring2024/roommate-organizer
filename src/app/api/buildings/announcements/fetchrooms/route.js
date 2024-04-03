import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/db";
import { getProfileIfBuilding } from "@/app/api/_utils";
/**
 * @swagger
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
export async function GET(request, context) {
  try {
    const buildingId = request.nextUrl.searchParams.get("buildingId");

    if (!buildingId) {
      return NextResponse.json(
        { message: "No building ID provided" },
        { status: 400 }
      );
    }

    const profile = await getProfileIfBuilding(buildingId); 
    if (!profile) {
      return NextResponse.json(
        { message: "User is not a member of the building" },
        { status: 400 }
      );
    }

    if (profile.role !== "MANAGER") {
      return NextResponse.json(
      { message: "User is not authorized" },
      { status: 401 }
      );
    }

    const rooms = await prisma.room.findMany({
      where: {
      buildingId: buildingId,
      },
      include: {
      announcements: {
        where: {
        sentToId: profile.id
        }
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

C