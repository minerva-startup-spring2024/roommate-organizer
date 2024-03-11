import TopBar from "@/app/_components/TopBar/TopBar";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RoomLayout({ children, params }) {
  const user = await getProfileIfMember(params.slug);

  const roomDetails = user.rooms.find((item) => item.id === params.slug);

  return (
    <div>
      <TopBar
        title={roomDetails.name}
        details={true}
        onDetailsClick={() => console.log("Hi")}
      />
      <div className={styles.container}>{children}</div>
    </div>
  );
}
