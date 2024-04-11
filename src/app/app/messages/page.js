// import CreateEntityBox from "@/app/_components/CreateEntityBox/CreateEntityBox";
// import EntitiesOverview from "@/app/_components/EntitiesOverview.js";
import Messages from "@/app/_components/Messages/Messages.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";
import styles from "./page.module.css";

export default async function MessagesPage() {
  const user = await getProfile();

  return (
    <div className={styles.pageContainer}>
      <TopBar
        title={"Building Messages"}
        className={styles.topBarContainer}
        entityType={"messages"}
      />
      <div className={styles.mainBodyContainer}>
        <Messages user={user} />
        {/* <EntitiesOverview entity={user.rooms} entityType={"rooms"} />
        <CreateEntityBox context={{ entityType: "room", route: "rooms" }} /> */}
      </div>
    </div>
  );
}
