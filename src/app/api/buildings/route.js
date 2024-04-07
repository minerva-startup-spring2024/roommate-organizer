import { getProfile, getProfileIfMember } from "@/app/api/_utils";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

/**
 * @swagger
 * /buildings:
 *   post:
 *     summary: Create a new building entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buildingOwnerId:
 *                 type: string
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 building:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     address:
 *                       type: string
 *                     buildingOwnerId:
 *                       type: string
 *       500:
 *         description: Failed to create building
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *   get:
 *     summary: Get all buildings
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   buildingOwnerId:
 *                     type: string
 *       404:
 *         description: No buildings found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to fetch buildings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

export async function POST(request) {
  const buildingData = await request.json();
  const profile = await getProfile();

  try {
    const building = await prisma.building.create({
      data: {
        name: buildingData.name,
        address: buildingData.address,
        members: {
          connect: { id: profile.id },
        },
      },
    });

    return NextResponse.json(
      { message: "Created building entry", building: building },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to create building", error);
    return NextResponse.json(
      { message: "Failed to create building", error: error.message },
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

    const building = await prisma.building.findUnique({
      where: {
        id: buildingId,
      },
      include: {
        members: true,
        rooms: {
          include: {
            members: true,
          },
        },
      },
    });

    return NextResponse.json({ ...building }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting buidling", error: error },
      { status: 500 }
    );
  }
}
