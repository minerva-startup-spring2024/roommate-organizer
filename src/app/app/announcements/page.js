
import { getProfile } from "@/app/api/_utils"
import FetchBuildingsList from "@/app/_components/FetchBuildingnRoom/FetchBuilding";

export default async function showAnnouncements(){
    const user= await getProfile();

    return(
        <div> <FetchBuildingsList/></div>     
    )

};
