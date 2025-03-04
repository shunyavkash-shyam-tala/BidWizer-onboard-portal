import React from "react";
import { useFormContext } from "react-hook-form";
import style from "./TextInput.module.css";

const TextInput = ({
  label,
  name,
  type = "text",
  required = false,
  disabled = false,
  ...rest
}) => {
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
        <input
          type={type}
          id={name}
          {...register(name)}
          disabled={disabled}
          {...rest}
        />
        {errors[name] && (
          <span className={style.error_text}>{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
