import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";

export default async function RoomChoresPage() {
  const user = await getProfile();

  return (
    <div>
      {/* <TopBar title={"Rooms"} />
      <div className="mainContainer">
        <RoomsOverview rooms={user.rooms} />
        <CreateRoomBox context={{ user: user }} />
      </div> */}
    </div>
  );
}
