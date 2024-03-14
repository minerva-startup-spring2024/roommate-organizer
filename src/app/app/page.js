
import CreateRoomBox from "@/app/_components/CreateRoomBox/CreateRoomBox.js";
import RoomsOverview from "@/app/_components/RoomsOverview.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";
import { redirect } from "next/navigation";




export default async function HomePage() {


    const user = await getProfile(); 


          
    // If the user does not have any rooms, redirect them to the /buildings page and if their query has a building id to avoid circular navigation.Has circular navigation
    /*
    if (!user.rooms || user.rooms.length === 0){
      redirect('app/buildings');
      return;
    }*/
    

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
