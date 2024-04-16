import CreateRoomBox from "@/app/_components/CreateRoomBox/CreateRoomBox.js";
import RoomsOverview from "@/app/_components/RoomsOverview.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";
import styles from "./page.module.css";

export default async function HomePage() {
  const user = await getProfile();

  return (
    <div className={styles.pageContainer}>
      <TopBar title={"Rooms"} className={styles.topBarContainer} />
      <div className={styles.mainBodyContainer}>
        <RoomsOverview rooms={user.rooms} />
        <CreateRoomBox context={{ user: user }} />
      </div>
    </div>
  );
}
