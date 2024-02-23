import AddRoomForm from "@/app/_components/CreateRoom";
import Home from "@/app/_components/Home";
import { getProfile } from "@/utils/api";

export default async function HomePage() {
  const user = await getProfile();

  return (
    <main className="max-w-lg m-auto">
      <h1 className="text-2xl text-center mb-6">Home</h1>
      {user && user.rooms && user.rooms.length > 0 ? (
        <Home rooms={user.rooms} />
      ) : (
        <p>No rooms yet</p>
      )}
      <AddRoomForm context={{ user: user }} />
    </main>
  );
}
