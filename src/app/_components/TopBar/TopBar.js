import Link from "next/link";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";

import styles from "./TopBar.module.css";

export default function TopBar({ title, details, slug, entityType}) {
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
              href={`/app/${entityType}/${slug}/announcements`}
              style={{ marginRight: 7 }}
              className={styles.linkIcon}
            >
              <FaMessage size={22} color={"white"} />
            </Link>

            <Link
              href={`/app/${entityType}/${slug}/members`}
              style={{ marginRight: 8 }}
              className={styles.linkIcon}
            >
              <FaPeopleGroup size={22} color={"white"} />
            </Link>
          </>
        ) : (
          <>
            <p className={styles.header}>{title}</p>
          </>
        )}
      </div>
    </div>
  );
}
