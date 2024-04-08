"use client";
import Image from "next/image";
import styles from "./Card.module.css";

function Card({ user, content, updatedAt }) {
  return (
    <div className={styles.card}>
      <Image
        src={
          user
            ? user.profileImage &&
              `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${user.profileImage}`
            : "/default.png"
        }
        alt={user ? user.profileImage && user.profileImage : "No alt"}
        width={60}
        height={60}
        className={styles.profilePhoto}
      />
      <div className={styles.cardText}>{content}</div>
      <div className={styles.dateText}>
        {new Date(updatedAt).toLocaleString()}
      </div>
    </div>
  );
}

export default Card;
