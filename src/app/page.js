import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  
  if (!data.session?.user) {
    redirect("/login");
  }

  return (
    <main>
      <h1 className="text-2xl text-center mb-8">Protected page</h1>
      <pre>{JSON.stringify({ session: data.session }, null, 4)}</pre>
    </main>
  );
}