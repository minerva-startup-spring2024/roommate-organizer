import AddBuildingForm from "@/app/_components/CreateBuildingBox/CreateBuilding";
import BuildingsList from "@/app/_components/CreateBuildingLists/BuildingList";
import { getProfile } from "@/app/api/_utils";



export default async function BuildingPage() {
    const user = await getProfile();

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