import Room from "@/app/_components/Room/Room";

export default async function RoomPage({ params }) {
  return <Room roomId={params.slug} />;
}
