"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import styles from "./TopBar.module.css";

export default function TopBar({ title, details, slug, entityType }) {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
  };

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
            <div className={styles.hStack}>
              <Link
                href={`/app/${entityType}/${slug}/members`}
                className={styles.linkIcon}
                style={{ marginRight: 8 }}
              >
                <FaPeopleGroup size={20} color={"white"} />
                <span className={styles.label}>Roommates</span>
              </Link>
              
            </div>
          </>
        ) : (
          <>
            <p className={styles.header}>{title}</p>
            <FaSignOutAlt size={22} color={"white"} onClick={handleLogout} />
          </>
        )}
      </div>
    </div>
  );
}
