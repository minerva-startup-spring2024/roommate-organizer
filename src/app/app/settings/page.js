import SettingsView from "@/app/_components/SettingsView/SettingsView.js";
// import { getProfile } from "@/app/api/_utils";
import TopBar from "@/app/_components/TopBar/TopBar.js";

export default async function SettingsPage() {
  // const user = await getProfile();

  return (
    <div>
      <TopBar title={"Settings"} />
      <div className="mainContainer">
        <SettingsView />
      </div>
    </div>
  );
}
