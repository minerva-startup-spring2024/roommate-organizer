import prisma from "../../../lib/db";

export const checkMembership = async (roomId, userId) => {
  const isMember = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    include: {
      members: {
        where: {
          userId: userId,
        },
      },
    },
  });

  if (!isMember) {
    return NextResponse.json(
      { message: "User is not a member of the room" },
      { status: 400 }
    );
  }
};
