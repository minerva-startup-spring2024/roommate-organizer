import AddRoomForm from "@/app/_components/CreateRoom";
import Home from "@/app/_components/Home";
import { getUser } from "@/utils/api";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const chores = [
    "Clean the kitchen",
    "Take out the trash",
    "Vacuum the living room",
  ];
  const assignments = ["John", "Sarah", "Michael"];
  const announcements = ["Meeting at 2pm", "New roommate moving in next week"];
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user) {
    redirect("/login");
  }

  const user = await getUser(data.session);

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
