import RoomDetail from "@/app/_components/RoomDetail";

export default async function RoomPage({ params }) {
  return <RoomDetail roomId={params.slug} />;
}
