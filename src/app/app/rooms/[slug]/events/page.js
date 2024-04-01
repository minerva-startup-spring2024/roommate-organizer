import EventsDetailView from "@/app/_components/EventsDetailView/EventsDetailView";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";

export default async function RoomChoresPage({ params }) {
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
    <EventsDetailView
      listType="events"
      roomId={params.slug}
      userProfile={profile}
      endpoint="shopping-list-items"
      attributeName="shoppingListItems"
    />
  );
}
