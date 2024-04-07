import CreateRoomBox from "@/app/_components/CreateRoomBox/CreateRoomBox.js";
import RoomsOverview from "@/app/_components/RoomsOverview.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getProfile();
  if (!user) {
    redirect("/");
  }
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    redirect("/"); // Redirect to login after calling logout endpoint
  };
  return (
    <div>
      <TopBar title={"Rooms"} onLogout={handleLogout} />
      <div className="mainContainer">
        <RoomsOverview rooms={user.rooms} />
        <CreateRoomBox context={{ user: user }} />
      </div>
    </div>
  );
}
