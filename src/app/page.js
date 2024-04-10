import { getProfile } from "@/app/api/_utils";
import { redirect } from "next/navigation";
import { BeatLoader } from "react-spinners";
import "./globals.css";

export default async function LandingPage() {
  const user = await getProfile();
  if (user) {
    redirect("/app/rooms");
  }

  return (
    <div>
      <BeatLoader />
    </div>
  );
}
