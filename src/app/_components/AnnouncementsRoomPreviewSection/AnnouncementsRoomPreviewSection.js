import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AnnouncementsRoomPreviewSection.module.css";

function AnnouncementsRoomPreviewSection({ announcements, members }) {
  const pathname = usePathname();
  const latestAnnouncement = announcements
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA;
    })
    .slice(0, 1);

  return (
    <div className={styles.announcementsSection}>
      <div className={styles.boxContainer}>
        <p className={styles.boxTitle}>ANNOUNCEMENTS</p>
        <Link href={`${pathname}/announcements`}>
          <p className={styles.boxTitle}>VIEW {announcements.length} MORE</p>
        </Link>
      </div>
      <div className={styles.announcementCards}>
        {latestAnnouncement.map((announcement) => {
          const updatedAt = new Date(announcement.updatedAt);
          const formattedUpdatedAt = `${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`;
          const member = members.find(
            (member) => member.id === latestAnnouncement.sentById
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
                    member
                      ? member.profileImage &&
                        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${member.profileImage}`
                      : "/default.png"
                  }
                  alt={
                    member
                      ? members.find(
                          (member) => member.id === latestAnnouncement.sentById
                        ).profileImage
                      : "No alt"
                  }
                  width={25}
                  height={25}
                  className={styles.profilePhoto}
                />
                {member ? (
                  <>
                    {member.firstName} {member.lastName}
                  </>
                ) : (
                  <></>
                )}
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
