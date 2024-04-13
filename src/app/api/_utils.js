import prisma from "@/../lib/db";
import { isAuthenticated } from "@/utils/authWrapper";

export const getProfile = async () => {
  const { user } = await isAuthenticated();

  const res = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      rooms: {
        include: {
          members: true,
          choreLists: { include: { choreListItems: true } },
          shoppingLists: { include: { shoppingListItems: true } },
        },
      },
      buildings: {
        include: {
          members: true,
          rooms: true,
        },
      },
    },
  });

  return res;
};

export const getProfileIfMember = async ({ entityId, entityType }) => {
  const profile = await getProfile();
  if (entityType === "room") {
    if (!profile.rooms.some((room) => room.id === entityId)) {
      return;
    }
  } else if (entityType === "building") {
    if (!profile.buildings.some((building) => building.id === entityId)) {
      return;
    }
  }

  return profile;
};
