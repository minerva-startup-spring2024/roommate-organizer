import CreateAnnouncement from "@/app/_components/CreateRoomAnnouncement/CreateAnnouncement";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";

export default async function AnnouncementPage({ params }) {
  const profile = await getProfileIfMember({
    entityId: params.slug,
    entityType: "room",
  });

  if (!profile) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  return (
    <>
      <CreateAnnouncement roomId={params.slug} role="ROOMMATE" senderId={profile.id}/>
    </>
  );
}
 