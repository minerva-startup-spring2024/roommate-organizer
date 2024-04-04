
import CreateRoomBox from "@/app/_components/CreateRoomBox/CreateRoomBox.js";
import RoomsOverview from "@/app/_components/RoomsOverview.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";
import { redirect } from "next/navigation";




export default async function HomePage() {


    const user = await getProfile(); 
    console.log(user)


        
   // Check if the user has any room associated with a building
const hasBuilding = user.rooms.some(room => room.buildingId);

// If the user does not have any room associated with a building, redirect them
if (!hasBuilding) {
  redirect('app/buildings');
  return;
}

    

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
