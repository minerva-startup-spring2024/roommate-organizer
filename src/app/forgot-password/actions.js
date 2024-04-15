"use server";

import { redirect } from "next/navigation";
import validator from "validator";
import { createClient } from "@/utils/supabase/server";


export async function forgotPassword(email) {
  const supabase = createClient();

  if (!validator.isEmail(email)) {
    return "Please enter a valid email!";
  }

  try {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    
    if (error) {
      return error.message;
    }

    return null; 
  } catch (error) {
    return "An error occurred while processing your request. Please try again later.";
  }
  redirect("/app");
}
