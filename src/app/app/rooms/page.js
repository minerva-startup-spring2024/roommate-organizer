import CreateEntityBox from "@/app/_components/CreateEntityBox/CreateEntityBox";
import EntitiesOverview from "@/app/_components/EntitiesOverview.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";
import styles from "./page.module.css";

export default async function HomePage() {
  const user = await getProfile();

  return (
    <div className={styles.pageContainer}>
      <TopBar
        title={"Rooms"}
        className={styles.topBarContainer}
        entityType={"rooms"}
      />
      <div className={styles.mainBodyContainer}>
        <EntitiesOverview entity={user.rooms} entityType={"rooms"} />
        <CreateEntityBox context={{ entityType: "room", route: "rooms" }} />
      </div>
    </div>
  );
}
