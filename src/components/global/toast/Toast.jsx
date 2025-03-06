import React from "react";
import styles from "./Toast.module.css";

const Toast = ({ type = "success", message }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return "https://img.icons8.com/color/48/checked--v1.png";
      case "warning":
        return "https://img.icons8.com/color/48/error--v1.png";
      case "error":
        return "https://img.icons8.com/color/48/high-priority.png";
      default:
        return "";
    }
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <img
        className={styles.toastIcon}
        src={getIcon()}
        alt={type}
        width="24"
        height="24"
      />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
