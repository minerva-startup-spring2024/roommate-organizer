import { v4 as uuidv4 } from "uuid";
import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";


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
  const buildingId=uuidv4();

  try {
    const createdBuilding = await prisma.$transaction([
    prisma.building.create({
      data: {
        id: buildingId,
        buildingOwnerId: buildingData.buildingOwnerId,
        name: buildingData.name,
        address: buildingData.address,
      },
    }),
    prisma.profile.update({

        where: { id: buildingData.buildingOwnerId },
        data: { 
          buildings: {
            connect: { id: buildingId },
          }
        },
    }),
    prisma.profileBuilding.create({
        data: {
            profileId: buildingData.buildingOwnerId,
            buildingId: buildingId, 
        }
    })
  ]);

    return NextResponse.json(
      { message: "Created building entry", building: createdBuilding },
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


export async function GET(request) {
  try {
    const buildings = await prisma.building.findMany({
      select: {
        id: true, 
        name: true, // Include the building name
        address: true,
        buildingOwnerId: true, // Include the building owner ID  
      },
    });

    // If buildings exist, return them
    if (buildings.length > 0) {
      return NextResponse.json(buildings, { status: 200 });
    } else {
      // If no buildings found, return a message indicating so
      return NextResponse.json({ message: "No buildings found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to fetch buildings", error);
    return NextResponse.json(
      { message: "Failed to fetch buildings", error: error.message },
      { status: 500 }
    );
  }
}