import Link from "next/link";
import { FaUserGroup } from "react-icons/fa6";
import styles from "./RoomPreview.module.css";

export default function RoomPreview({ room }) {
  return (
    <Link className={styles.container} href={`/app/rooms/${room.id}`}>
      <p className={styles.previewText}>{room.name}</p>
      <div className={styles.memberContainer}>
        <FaUserGroup style={{ marginRight: 10 }} color={"#373943"} />
        <p className={styles.previewText}> {room.members.length}</p>
      </div>
    </Link>
  );
}
