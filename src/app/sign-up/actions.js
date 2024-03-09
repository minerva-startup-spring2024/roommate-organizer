"use server";

import { redirect } from "next/navigation";
import validator from "validator";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData) {
  const supabase = createClient();

  if (!validator.isEmail(formData.email)) {
    return "Please, enter a valid email!";
  }

  if (!validator.isStrongPassword(formData.password)) {
    return "Please, enter a valid password! Your password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol.";
  }

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return error.message;
  }

  redirect("/create-profile");
}
