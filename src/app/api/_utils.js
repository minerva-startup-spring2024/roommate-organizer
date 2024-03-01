import { getProfile } from "@/utils/api";

export const getProfileIfMember = async (roomId) => {
  const profile = await getProfile();

  if (!profile.rooms.some((room) => room.id === roomId)) {
    return;
  }

  return profile;
};


