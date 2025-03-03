import React from "react";
import style from "./InputRow.module.css";

const InputRow = ({ children }) => {
  return <div className={style.input_box}>{children}</div>;
};

export default InputRow;
