import TopBar from "@/app/_components/TopBar/TopBar";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";
import styles from "./layout.module.css";

export default async function RoomLayout({ children, params }) {
  var buildingDetails = {};
  const user = await getProfileIfMember({
    entityId: params.slug,
    entityType: "building",
  });

  if (user) {
    var buildingDetails = user.buildings.find(
      (item) => item.id === params.slug
    );
  }

  return (
    <>
      <TopBar
        title={buildingDetails.name}
        slug={params.slug}
        entityType={"buildings"}
        details={true}
      />
      <div className={styles.container}>{children}</div>
    </>
  );
}
