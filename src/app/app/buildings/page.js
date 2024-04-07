import CreateEntityBox from "@/app/_components/CreateEntityBox/CreateEntityBox";
import EntitiesOverview from "@/app/_components/EntitiesOverview.js";
import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";
import styles from "./page.module.css";

export default async function BuildingPage() {
  const user = await getProfile();

  return (
    <div className={styles.pageContainer}>
      <TopBar
        title={"Buildings"}
        className={styles.topBarContainer}
        entityType={"buildings"}
      />
      <div className={styles.mainBodyContainer}>
        <EntitiesOverview entity={user.buildings} entityType={"buildings"} />
        <CreateEntityBox
          context={{ user: user, entityType: "building", route: "buildings" }}
        />
      </div>
    </div>
  );
}
