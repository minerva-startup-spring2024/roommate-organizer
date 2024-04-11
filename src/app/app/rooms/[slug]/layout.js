import TopBar from "@/app/_components/TopBar/TopBar";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";
import styles from "./layout.module.css";

export default async function RoomLayout({ children, params }) {
  var roomDetails = {};
  const user = await getProfileIfMember({
    entityId: params.slug,
    entityType: "room",
  });

  if (user) {
    var roomDetails = user.rooms.find((item) => item.id === params.slug);
  }

  return (
    <>
      <TopBar
        title={roomDetails.name}
        details={true}
        slug={params.slug}
        entityType={"rooms"}
      />
      <div className={styles.container}>{children}</div>
    </>
  );
}
