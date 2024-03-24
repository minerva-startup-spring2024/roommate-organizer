import { getProfile } from "../../_utils";
import prisma from "../../../../../lib/db";
import { NextResponse } from "next/server";


export async function POST(request,context){

    const user = await getProfile()
    const { buildingId } =await request.json();
    try {
        const updateProfileBuilding = await prisma.profile.update({

            where: { id: user.id},
            data: { buildings: { connect: { id: buildingId } } },
        });
    
        return NextResponse.json(
          { message: "Profile updated successfuly" },
          { status: 200 }
        );
      } catch (error) {
        console.error("Failed to create building", error);
        return NextResponse.json(
          { message: "Failed to update profile with building:", error: error.message },
          { status: 500 }
        );
      }
}