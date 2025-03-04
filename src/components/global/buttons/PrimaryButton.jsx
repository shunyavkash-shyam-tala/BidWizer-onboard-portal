import React from "react";
import style from "./PrimaryButton.module.css";
export default function PrimaryButton({ children, loading = false, ...rest }) {
  return (
    <button
      className={`${style.primary_btn} ${loading ? style.loading : ""}`}
      type="submit"
      {...rest}
    >
      <span className={style.button_text}>{children}</span>
      <span className={style.loading_spinner}></span>
    </button>
  );
}
