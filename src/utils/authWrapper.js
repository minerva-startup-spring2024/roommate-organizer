import { createClient } from "./supabase/server";

export async function isAuthenticated() {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function getProfile(user) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("userId", user.user.id)
    .single();

  if (error) {
    console.log("ERROR IN GETTING PROFILE:", error);
    return null;
  }

  return data;
}
