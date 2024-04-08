import SettingsView from "@/app/_components/SettingsView/SettingsView.js";
import { getProfile } from "@/app/api/_utils";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import Feedback from "@/app/_components/UserFeedbackView/UserFeedbackView.js";
import styles from "./page.module.css";

export default async function SettingsPage() {
  const user = await getProfile();
  console.log("user", user)

  return (
    <div>
      <TopBar title={"Settings"} />
      <div className="mainContainer">
        <SettingsView />
      </div>
      <Feedback currentUser={user}></Feedback>
      <div className={styles.footer}>Thanks for using roommate organizer ❤️</div>
    </div>
  );
}
