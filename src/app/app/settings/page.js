import { getProfile } from "@/app/api/_utils";
import { createClient } from "@/utils/supabase/server";
import GreyBeatLoader from "@/app/_components/BeatLoaders/GreyBeatLoader";
import SettingsView from "@/app/_components/SettingsView/SettingsView.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import Feedback from "@/app/_components/UserFeedbackView/UserFeedbackView.js";
import styles from "./page.module.css";

export default async function SettingsPage() {
  const profile = await getProfile();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  return (
    <div>
      <TopBar title={"Settings"} />
      <div className="mainContainer">
        <SettingsView />
      </div>
      {user && profile ? (
        <Feedback
          userEmail={user.data.user.email}
          userId={user.data.user.id}
          userFirstName={profile.firstName}
        />
      ) : (
        <GreyBeatLoader />
      )}
      <div className={styles.footer}>Thanks for using Roommate Organizer ❤️</div>
    </div>
  );
}
