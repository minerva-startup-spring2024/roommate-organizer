import CreateAnnouncement from "@/app/_components/CreateRoomAnnouncement/CreateAnnouncement";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";

export default async function AnnouncementPage({ params }) {
  const profile = await getProfileIfMember({
    entityId: params.slug,
    entityType: "building",
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
      <CreateAnnouncement buildingId={params.slug} role="MANAGER" senderId={profile.id}/>
    </>
  );
}
 