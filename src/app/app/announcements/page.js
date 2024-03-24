
import { getProfile } from "@/app/api/_utils"
import FetchBuildingsList from "@/app/_components/FetchBuildingnRoom/FetchBuilding";
import MessageForm from "@/app/_components/AnnouncementsRoomPreviewSection/RoomBuildingAnnouncement";

export default async function showAnnouncements(){
    const user= await getProfile();

    return(
        user.role==='MANAGER'?
        <div> <FetchBuildingsList/></div>:
        <div><MessageForm senderId={user.id}/></div>
    )
};
