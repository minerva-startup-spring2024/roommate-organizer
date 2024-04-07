import CreateEntityBox from "@/app/_components/CreateEntityBox/CreateEntityBox.js";

import TopBar from "@/app/_components/TopBar/TopBar.js";
import { getProfile } from "@/app/api/_utils";
import "@/app/globals.css";
import EntitiesOverview from "../_components/EntitiesOverview";
import styles from "./page.module.css";

export default async function HomePage() {
  const user = await getProfile();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    redirect("/");
  };

  if (user.role === "MANAGER") {
    return (
      <div className={styles.pageContainer}>
        <TopBar
          title={"Buildings"}
          role={user.role}
          entityType={"buildings"}
          onLogout={handleLogout}
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

  return (
    <div className={styles.pageContainer}>
      <TopBar
        title={"Rooms"}
        role={user.role}
        entityType={"rooms"}
        onLogout={handleLogout}
      />
      <div className={styles.mainBodyContainer}>
        <EntitiesOverview entity={user.rooms} entityType={"rooms"} />
        <CreateEntityBox
          context={{ user: user, entityType: "room", route: "rooms" }}
        />
      </div>
    </div>
  );
}
