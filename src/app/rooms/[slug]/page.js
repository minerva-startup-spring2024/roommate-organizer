import RoomDetail from "@/app/_components/RoomDetail";
import { getUser } from "@/utils/api";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function RoomPage({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }

  const user = await getUser(data.session);

  return <RoomDetail roomId={params.slug} />;
}
