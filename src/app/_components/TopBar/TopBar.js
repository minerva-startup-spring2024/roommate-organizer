import { FaHome } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import styles from "./TopBar.module.css";

export default function TopBar({ title, details, onDetailsClick }) {
  return (
    <div className={styles.topBar}>
      <div className={styles.headerContainer}>
        {details ? (
          <>
            <div className={styles.roomTitle}>
              <FaHome size={22} color={"white"} style={{ marginRight: 10 }} />
              <p className={styles.header}>{title}</p>
            </div>
            <FaGear size={22} color={"white"} />
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
