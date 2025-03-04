import React from "react";
import { useFormContext } from "react-hook-form";
import style from "./CheckboxInput.module.css";

const CheckboxInput = ({ label, name, defaultChecked = false, props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={style.input_checkbox}>
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        defaultChecked={defaultChecked}
        {...props}
      />
      <label className={style.checkbox_label} htmlFor={name}>
        {label}
      </label>
      {errors[name] && (
        <span className={style.error_text}>{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default CheckboxInput;
