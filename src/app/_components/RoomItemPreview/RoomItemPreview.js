import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import styles from "./RoomItemPreview.module.css";

const RoomItemPreview = ({ previewTitle, items, roomId, linkRoute }) => {
  return (
    <div className={styles.itemPreviewContainer}>
      <p className={styles.boxTitle}>{previewTitle}</p>
      <div className={styles.itemsContainer}>
        {items.length === 0 ? (
          <div className={styles.emptyText}>No {previewTitle}</div>
        ) : (
          <>
            {items.slice(0, 3).map((item) => (
              <Link
                href={`${roomId}/${linkRoute}`}
                key={item.id}
                className={styles.itemContainer}
              >
                <div className={styles.itemLabel}>
                  <Image
                    src={
                      item.assignedTo.profileImage
                        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${item.assignedTo.profileImage}`
                        : "/default.png"
                    }
                    alt={
                      item.assignedTo ? item.assignedTo.profileImage : "No alt"
                    }
                    width={25}
                    height={25}
                    className={styles.itemImage}
                  />
                  {item.name}
                </div>
                <FaAngleRight color={"#373943"} />
              </Link>
            ))}
          </>
        )}
        <div className={styles.viewMoreContainer}>
          <Link
            href={`${roomId}/${linkRoute}`}
            className={styles.viewMoreButton}
          >
            View or add {previewTitle}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomItemPreview;
