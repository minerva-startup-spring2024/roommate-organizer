import MessageForm from "@/app/_components/AnnouncementsRoomPreviewSection/RoomBuildingAnnouncement";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";

export default async function AnnouncementForm({ params }) {
  const profile = await getProfileIfMember(params.slug);

  if (!profile) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
  return (
    <MessageForm
      senderId={profile.id} 
      roomId={params.slug}
    />
  );
}