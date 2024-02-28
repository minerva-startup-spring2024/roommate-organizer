import { getProfile } from "@/utils/api";
import CreateRoomBox from "../_components/CreateRoomBox/CreateRoomBox.js";
import RoomsOverview from "../_components/RoomsOverview.js";
import TopBar from "../_components/TopBar/TopBar.js";
import "../globals.css";

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
