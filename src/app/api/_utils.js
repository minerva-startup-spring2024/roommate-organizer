import prisma from "@/../lib/db";
import isAuthenticated from "@/utils/authWrapper";

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
    },
  });

  return res;
};

export const getProfileIfMember = async (roomId) => {
  const profile = await getProfile();

  if (!profile.rooms.some((room) => room.id === roomId)) {
    return;
  }

  return profile;
};
