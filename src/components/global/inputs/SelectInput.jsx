import React from "react";
import { useFormContext } from "react-hook-form";
import style from "./SelectInput.module.css";

const SelectInput = ({
  label,
  name,
  required = false,
  defaultValue = "",
  options = [],
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
        <select
          id={name}
          {...register(name)}
          disabled={disabled}
          defaultValue={defaultValue}
          {...rest}
        >
          {options.map((option, index) => (
            <option
              key={option?.value || index}
              value={option?.value}
              disabled={option?.disabled}
            >
              {option?.title}
            </option>
          ))}
        </select>
        {errors[name] && (
          <span className={style.error_text}>{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
