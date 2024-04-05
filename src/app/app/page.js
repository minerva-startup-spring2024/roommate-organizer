import CreateRoomBox from "@/app/_components/CreateRoomBox/CreateRoomBox.js";
import RoomsOverview from "@/app/_components/RoomsOverview.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getProfile();
  console.log('user:', {user}); 
   // Check if the user IS associated with a building
   const hasBuilding = Array.isArray(user.ProfileBuilding) && user.ProfileBuilding.length > 0;
   console.log('hasBuilding:', hasBuilding);
   
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