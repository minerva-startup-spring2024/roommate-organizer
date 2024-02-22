import { createClient } from "./supabase/server";

export default async function isAuthenticated() {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}
