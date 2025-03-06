import React from "react";
import styles from "./FormSubmittedBanner.module.css";
export default function FormSubmittedBanner() {
  return (
    <div className={styles.alert}>
      <div className={styles.alertIcon}>
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/color/48/verified-account--v1.png"
          alt="Success Icon"
        />
      </div>
      <div className={styles.alertContent}>
        <p className={styles.alertTitle}>Success</p>
        <p className={styles.alertDescription}>
          On-Boarding process is successfully completed.
        </p>
      </div>
    </div>
  );
}
