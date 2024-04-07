import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import styles from "./TopBar.module.css";

export default function TopBar({ title, details, slug, entityType, onLogout }) {
  return (
    <div className={styles.topBar}>
      <div className={styles.headerContainer}>
        {details ? (
          <>
            <Link
              href={`/app/${entityType}/${slug}`}
              className={styles.roomTitle}
            >
              <p className={styles.header}>{title}</p>
            </Link>
            <Link
              href={`/app/${entityType}/${slug}/members`}
              style={{ marginRight: 8 }}
              className={styles.linkIcon}
            >
              <FaPeopleGroup size={22} color={"white"} />
              <FaSignOutAlt size={22} color={"white"} onClick={onLogout} />
            </Link>
          </>
        ) : (
          <>
            <p className={styles.header}>{title}</p>
            <FaSignOutAlt size={22} color={"white"} onClick={onLogout} />
          </>
        )}
      </div>
    </div>
  );
}
