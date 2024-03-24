import { v4 as uuidv4 } from "uuid";
import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";



export async function POST(request) {
  const buildingData = await request.json();

  try {
    const createdBuilding = await prisma.building.create({
      data: {
        id: uuidv4(),
        buildingOwnerId: buildingData.buildingOwnerId,
        name: buildingData.name,
        address: buildingData.address,
      },
    });

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
        id: true, // Assuming you want to return the ID
        name: true,
        address: true,
        buildingOwnerId: true, // Include or exclude as per your requirements
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