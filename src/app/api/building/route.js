import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request, context) {


  const buidingData = await request.json();
  const createBuiding = await prisma.Buiding.create({
    data: {
      id: uuidv4(),
      BuidingOwnerId: buidingData.BuidingOwnerId,
      name: buidingData.name,
      address:buidingData.address,
     
    },
  });

  return NextResponse.json(
    { message: "Created buiding entry", building: buidingData },
    { status: 200 }
  );
}

