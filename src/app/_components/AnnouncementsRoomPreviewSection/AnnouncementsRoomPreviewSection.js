import Image from "next/image";
import styles from "./AnnouncementsRoomPreviewSection.module.css";

function AnnouncementsRoomPreviewSection({ announcements, members }) {
  // Get the latest 3 announcements
  const sortedAnnouncements = announcements.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const latestAnnouncements = sortedAnnouncements.slice(0, 3);
  
  return (
    <div className={styles.announcementsSection}>
      <p className={styles.boxTitle}>ANNOUNCEMENTS</p>
      <div className={styles.announcementCards}>
        {latestAnnouncements.map((announcement) => {
          const updatedAt = new Date(announcement.updatedAt);
          const formattedUpdatedAt = `${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`;
          const member = members.find(
            (member) => member.id === latestAnnouncements[0].sentById
          );

          return (
            <div key={announcement.id} className={styles.announcementCard}>
              <div className={styles.announcementContent}>
                <p className={styles.announcementText}>
                  {announcement.content}
                </p>
              </div>
              <div className={styles.announcementDivider}></div>
              <div className={styles.announcementHeader}>
                {/*}
                <Image
                  className={styles.profilePhoto}
                  src="Placeholder photo"
                  alt="Profile"
                  width={25}
                  height={25}
                />
              */}
                <div className={styles.subheader}>
                  <p>Sent By:{announcement.sentBy?.firstName}</p>
                  <p>Last Updated: {formattedUpdatedAt}</p>
                  <p>{announcement.status}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnnouncementsRoomPreviewSection;
