import React from "react";
import style from "./FormSecondaryHeader.module.css";
export default function FormSecondaryHeader({
  heading,
  action = false,
  actionEventHandler = () => {},
}) {
  return (
    <div className={style.heading_box}>
      <h1>{heading}</h1>
      {action && (
        <button
          className={style.edit_btn}
          type="button"
          onClick={actionEventHandler}
        >
          <svg
            className="feather feather-edit"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
