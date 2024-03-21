import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/db";
import { getProfileIfBuilding } from "@/app/api/_utils";

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

    const rooms = await prisma.room.findMany({
      where: {
        buildingId: buildingId,
      },
      include: {
        announcements: true,
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

