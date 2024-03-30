import { getProfile } from "@/app/api/_utils";
import { redirect } from "next/navigation";
import { BeatLoader } from "react-spinners";
import "./globals.css";

export default async function LandingPage() {
  const user = await getProfile();
  if (user) {
    redirect("/app");
  }

  return (
    <main>
      <h1 className="text-2xl text-center mb-8">Protected page</h1>
    </main>
  );
}
