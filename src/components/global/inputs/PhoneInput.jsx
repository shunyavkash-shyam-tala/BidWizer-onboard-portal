import { useEffect } from "react";
import { PhoneInput as PhoneInputField } from "react-international-phone";
import "react-international-phone/style.css";
import { useFormContext } from "react-hook-form";
import style from "./PhoneInput.module.css";
import "./PhoneInput.css";

const PhoneInput = ({ label, name, required = false, disabled = false }) => {
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const phone = watch(name) || ""; // Sync with react-hook-form state

  useEffect(() => {
    register(name, { required: required ? "Phone number is required" : false });
  }, [register, name, required]);

  const handleChange = (phone) => {
    setValue(name, phone);
    phone.length > 2 && trigger(name);
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
          disabled={disabled}
        />
        {errors[name] && (
          <span className={style.error_text}>{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
