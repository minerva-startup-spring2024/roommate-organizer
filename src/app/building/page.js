import AddBuildingForm from "@/app/_components/createBuilding";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function BuildingPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }
  console.log(data.session.user)

  return (
    <main className="max-w-lg m-auto">
      <h1 className="text-2xl text-center mb-6">Building Details</h1>
      <AddBuildingForm context={data.session}/>
    </main>
  );
}