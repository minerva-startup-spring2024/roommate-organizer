import 'dotenv/config';
import CreateRoomBox from "@/app/_components/CreateRoomBox/CreateRoomBox.js";
import RoomsOverview from "@/app/_components/RoomsOverview.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";

export default async function HomePage() {
  const user = await getProfile();

  return (
    <div>
      <TopBar title={"Rooms"} />
      <div className="mainContainer">
        <RoomsOverview rooms={user.rooms} />
        <CreateRoomBox context={{ user: user }} />
      </div>
    </div>
  );
}
