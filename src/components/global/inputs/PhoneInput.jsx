import { PhoneInput as PhoneInputField } from "react-international-phone";
import "react-international-phone/style.css";
import { useFormContext, Controller } from "react-hook-form";
import style from "./PhoneInput.module.css";
import "./PhoneInput.css";

const PhoneInput = ({
  label,
  name,
  required = false,
  disabled = false,
  error,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={style.input_box}>
      <div className={style.inner_input}>
        <label className={style.input_label} htmlFor={name}>
          {label} {required && <span>*</span>}
        </label>
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? "Phone number is required" : false }}
          render={({ field }) => (
            <PhoneInputField
              {...field}
              defaultCountry="us"
              disabled={disabled}
              value={field.value || ""}
              onChange={(phone) => field.onChange(phone)}
            />
          )}
        />
        {(errors[name] || error) && (
          <span className={style.error_text}>
            {error || errors[name]?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
