import AddBuildingForm from "@/app/_components/CreateBuildingBox/CreateBuilding.js"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProfile } from "@/utils/api";

export default async function BuildingPage() {
  const user = await getProfile();

  if (!user) {
    redirect("/login");
  }



  return (
    <main className="max-w-lg m-auto">
      <h1 className="text-2xl text-center mb-6">Building Details</h1>
      <AddBuildingForm  context={{ user: user }}/>
    </main>
  );
}