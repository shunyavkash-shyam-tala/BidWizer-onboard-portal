import { useState } from "react";
import { PhoneInput as PhoneInputField } from "react-international-phone";
import "react-international-phone/style.css";
import { useFormContext } from "react-hook-form";
import style from "./PhoneInput.module.css";
import "./PhoneInput.css";

const PhoneInput = ({ label, name, required = false }) => {
  const [phone, setPhone] = useState("");
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleChange = (phone) => {
    setPhone(phone);
    setValue(name, phone, { shouldValidate: true });
  };

  return (
    <div className={style.input_box}>
      <div className={style.inner_input}>
        <label className={style.input_label} htmlFor={name}>
          {label} {required && <span>*</span>}
        </label>
        <PhoneInputField
          defaultCountry="us"
          value={phone}
          onChange={handleChange}
        />
        {errors[name] && (
          <span className={style.error_text}>{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
