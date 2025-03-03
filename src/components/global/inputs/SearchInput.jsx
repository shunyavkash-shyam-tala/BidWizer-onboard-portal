import React from "react";
import style from "./SearchInput.module.css";
export default function SearchInput() {
  return (
    <div className={style.input_box}>
      <div className={style.inner_input}>
        <label className={style.input_label} for="association">
          Dealer Name <span>*</span>
        </label>
        <div className={style.input_wrapper}>
          <input type="text" name="association" id="association" />
          <div className={style.loader} id="input-loader"></div>
        </div>
      </div>
    </div>
  );
}
