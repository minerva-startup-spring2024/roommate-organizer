import CreateRoomBox from "@/app/_components/CreateRoomBox/CreateRoomBox";
import RoomsOverview from "@/app/_components/RoomsOverview";
import TopBar from "@/app/_components/TopBar/TopBar";
import { getProfile } from "@/utils/api";
import "./globals.css";

export default async function LandinPage() {
  const user = await getProfile();

  return (
    <div>
      <TopBar title={"Rooms"}/>
      <div className="mainContainer">

        <RoomsOverview rooms={user.rooms} />
        <CreateRoomBox context={{ user: user }} />
      </div>
    </div>
  );
}
