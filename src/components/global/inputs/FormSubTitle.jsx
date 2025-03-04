import React from "react";
import style from "./FormSubTitle.module.css";
export default function FormSubTitle({ title, sx = {} }) {
  return (
    <div className={style.sub_heading_box} style={sx}>
      <h4>{title}</h4>
    </div>
  );
}
