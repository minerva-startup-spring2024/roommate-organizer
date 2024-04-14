import Link from "next/link";
import styles from "./CreateRoomAnnouncement.module.css"; 
import AnnouncementsRoomPreviewSection from "../AnnouncementsRoomPreviewSection/AnnouncementsRoomPreviewSection";

export default function CreateRoomAnnouncement({announcements, members, roomId, linkRoute, previewTitle}) { 
    return (
        <div className={styles.viewMoreContainer}>
            <Link href={`${roomId}/${linkRoute}`} className={styles.viewMoreButton}>
                View or add {previewTitle}
            </Link>
        </div>
    );
}

