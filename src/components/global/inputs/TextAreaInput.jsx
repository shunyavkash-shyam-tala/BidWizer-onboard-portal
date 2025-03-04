import React from "react";
import { useFormContext } from "react-hook-form";
import style from "./TextAreaInput.module.css";

const TextAreaInput = ({ label, name, rows = 2, required = false, props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={style.input_box}>
      <div className={style.inner_input}>
        <label className={style.input_label} htmlFor={name}>
          {label} {required && <span>*</span>}
        </label>
        <textarea rows={rows} id={name} {...register(name)} {...props} />
        {errors[name] && (
          <span className={style.error_text}>{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default TextAreaInput;
