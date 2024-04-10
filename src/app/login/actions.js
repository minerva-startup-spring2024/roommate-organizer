"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData) {
  const supabase = createClient();

  if (
    !formData.email ||
    !formData.password ||
    formData.email.length === 0 ||
    formData.password.length === 0
  ) {
    return "Email and password are required";
  }

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error.message;
  }

  redirect("/apps/rooms");
}
