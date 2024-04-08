import styles from "./SettingsView.module.css";

export default function SettingsView() {
  return (
    <div className={styles.pageContainer}>
      <div>
        <p className={styles.previewText}>More coming soon &#x1F680;...</p>
        <div className={styles.contactContainer}>
          <a href="mailto:roommateorganizer@gmail.com" className={styles.contactButton}>
            <span role="img" aria-label="Email" className={styles.emailIcon}>&#x1F4E7;</span> Contact us via email
          </a>
        </div>
        <div className={styles.buttonFooter}>We&apos;d love to hear your feedback!</div>
      </div>
    </div>
  );
}
