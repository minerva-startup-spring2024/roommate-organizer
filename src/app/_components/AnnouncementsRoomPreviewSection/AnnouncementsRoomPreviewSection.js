import styles from "./AnnouncementsRoomPreviewSection.module.css";

function AnnouncementsRoomPreviewSection({ announcements }) {
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

          return (
            <div key={announcement.id} className={styles.announcementCard}>
              <div className={styles.announcementContent}>
                <p>{announcement.content}</p>
              </div>
              <div className={styles.announcementDivider}></div>
              <div className={styles.announcementHeader}>
                <img
                  className={styles.profilePhoto}
                  src="Placeholder photo"
                  alt="Profile"
                />
                <div className={styles.subheader}>
                  <p>Placeholder Name</p>
                  <p>Last Updated: {formattedUpdatedAt}</p>
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
