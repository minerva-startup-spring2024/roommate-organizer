import RoomListDetailView from "@/app/_components/RoomListDetailView/RoomListDetailView";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";

export default async function RoomChoresPage({ params }) {
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
    <RoomListDetailView
      listType="shopping-list"
      roomId={params.slug}
      userProfile={profile}
      endpoint="shopping-list-items"
      attributeName="shoppingListItems"
    />
  );
}
