import Link from "next/link";
import { FaBuilding, FaUserGroup } from "react-icons/fa6";
import styles from "./EntityPreview.module.css";

export default function EntityPreview({ entity, entityType }) {
  return (
    <Link className={styles.container} href={`/app/${entityType}/${entity.id}`}>
      <p className={styles.previewText}>{entity.name}</p>
      <div className={styles.memberContainer}>
        {entityType === "buildings" ? (
          <>
            <FaBuilding style={{ marginRight: 10 }} color={"#373943"} />
            <p className={styles.previewText}> {entity.rooms.length}</p>
          </>
        ) : (
          <>
            <FaUserGroup style={{ marginRight: 10 }} color={"#373943"} />
            <p className={styles.previewText}> {entity.members.length}</p>
          </>
        )}
      </div>
    </Link>
  );
}
