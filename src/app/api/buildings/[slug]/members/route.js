import prisma from "@/../lib/db";
import { getProfileIfMember } from "@/app/api/_utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request, context) {
  const buildingId = context.params.slug;
  try {
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

    const buildingWithMembers = await prisma.building.findUnique({
      where: { id: buildingId },
      include: {
        members: true,
      },
    });

    return NextResponse.json(
      {
        members: buildingWithMembers.members,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting building members:", error);
    return NextResponse.error("Error getting building members", {
      status: 500,
    });
  }
}

export async function POST(request, context) {
  const buildingId = context.params.slug;
  try {
    const { profileId } = await request.json();

    if (!buildingId || !profileId) {
      return NextResponse.json(
        { message: "Both buildingId and userId are required" },
        { status: 400 }
      );
    }

    const inviter = await getProfileIfMember({
      entityId: buildingId,
      entityType: "building",
    });

    if (!inviter) {
      return NextResponse.json(
        { message: "User is not a member of the building" },
        { status: 400 }
      );
    }

    await prisma.building.update({
      where: { id: buildingId },
      data: {
        members: {
          connect: { id: profileId },
        },
      },
    });

    return NextResponse.json(
      { message: "User added to the building successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding user to building:", error);
    return NextResponse.error("Failed to add user to building", {
      status: 500,
    });
  }
}

export async function DELETE(request, context) {
  const buildingId = context.params.slug;
  try {
    const { profileId } = await request.json();

    if (!buildingId || !profileId) {
      return NextResponse.json(
        { message: "Both buildingId and userId are required" },
        { status: 400 }
      );
    }

    const remover = await getProfileIfMember({
      entityId: buildingId,
      entityType: "building",
    });

    if (!remover) {
      return NextResponse.json(
        { message: "User is not a member of the building" },
        { status: 400 }
      );
    }

    await prisma.building.update({
      where: { id: buildingId },
      data: {
        members: {
          disconnect: { id: profileId },
        },
      },
    });

    return NextResponse.json(
      { message: "User removed from the building successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing user from building:", error);
    return NextResponse.error("Failed to remove user from building", {
      status: 500,
    });
  }
}
