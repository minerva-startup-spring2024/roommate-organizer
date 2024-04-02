import TopBar from "@/app/_components/TopBar/TopBar";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";
import styles from "./layout.module.css";

export default async function RoomLayout({ children, params }) {
  var roomDetails = {};
  const user = await getProfileIfMember(params.slug);

  if (user) {
    var roomDetails = user.rooms.find((item) => item.id === params.slug);
  }

  return (
    <div>
      <TopBar title={roomDetails.name} details={true} slug={params.slug} />
      <div className={styles.container}>{children}</div>
    </div>
  );
}
