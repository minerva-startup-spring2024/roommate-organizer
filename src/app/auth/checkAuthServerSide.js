// auth/checkAuthServerSide.js
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function checkAuthServerSide(context) {
  const supabase = createServerComponentClient({ cookies: context.req.cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user) {
    redirect("/login");
  }

  return { props: { user: data.session.user } };
}