import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import styles from "./TopBar.module.css";

export default function TopBar({ title, details, onDetailsClick, onLogout }) {
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
            <FaSignOutAlt size={22} color={"white"} onClick={onLogout} />
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
