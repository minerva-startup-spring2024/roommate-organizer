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
                <Image
                  src={
                    announcement.sentById
                      ? member.profileImage &&
                        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${member.profileImage}`
                      : "/default.png"
                  }
                  alt={
                    announcement.sentById
                      ? members.find(
                          (member) =>
                            member.id === latestAnnouncements[0].sentById
                        ).profileImage
                      : "No alt"
                  }
                  width={25}
                  height={25}
                  className={styles.profilePhoto}
                />
                {member.firstName} {member.lastName}
              </div>
              <div className={styles.subheader}>
                Last Updated: {formattedUpdatedAt}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnnouncementsRoomPreviewSection;
