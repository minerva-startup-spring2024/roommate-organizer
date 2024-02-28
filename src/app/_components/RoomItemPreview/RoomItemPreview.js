import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import styles from "./RoomItemPreview.module.css";

const RoomItemPreview = ({ previewTitle, items, roomId }) => {
  return (
    <div className={styles.itemPreviewContainer}>
      <p className={styles.boxTitle}>{previewTitle.toUpperCase()}</p>
      <div className={styles.itemsContainer}>
        {items.length === 0 ? (
          <div className={styles.emptyText}>No {previewTitle}</div>
        ) : (
          <>
            {items.slice(0, 3).map((item) => (
              <Link
                href={`/rooms/${previewTitle}`}
                key={item.id}
                className={styles.itemContainer}
              >
                <div>{item.name}</div>
                <FaAngleRight color={"#373943"} />
              </Link>
            ))}
            <div className={styles.viewMoreContainer}>
              <Link
                href={`/rooms/${previewTitle}/${roomId}`}
                className={styles.viewMoreButton}
              >
                View all {previewTitle}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoomItemPreview;
