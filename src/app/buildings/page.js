import AddBuildingForm from "@/app/_components/CreateBuildingBox/CreateBuilding.js";
import BuildingsList from "../_components/CreateBuildingLists/BuildingsList";
import { getProfile } from "@/utils/api";
import Link from "next/link";

export default async function BuildingPage() {
  const user = await getProfile();

  if (!user) {
    redirect("/login");
  }

  //console.log(user.buildings)


  if (user === null) {
    return <p>Loading user profile...</p>;
  }

  

  return (
    <main className="max-w-lg m-auto">
      {user.role === 'MANAGER' ? (
        <>
          <h1 className="text-2xl text-center mb-6">Building Details</h1>
          <AddBuildingForm context={{ user }} />
        
          <div className="buildingsList">
            <BuildingsList />
          </div>
          
        </>
      ) : (
        
        <div className="buildingsList">
          <BuildingsList />
        </div>
        
      )}
    </main>
  );
}
