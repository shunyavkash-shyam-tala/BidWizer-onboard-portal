import React from "react";
import { useFormContext } from "react-hook-form";
import style from "./ExistingAdditionalContact.module.css";
import TextInput from "../global/inputs/TextInput";
import InputRow from "../global/inputs/InputRow";
import SelectInput from "../global/inputs/SelectInput";
import PhoneInput from "../global/inputs/PhoneInput";

export default function AddNewAdditionalUser({ index, onRemove }) {
  const {
    formState: { errors },
  } = useFormContext();

  const userTypeOptions = [
    { title: "", selected: true },
    { title: "Administrator", value: "administrator" },
    { title: "Bidder", value: "bidder" },
  ];

  return (
    <div className={style.additional_contact_input}>
      {/* Remove User Button */}
      <button
        className={style.remove_existing_contact_btn}
        type="button"
        onClick={onRemove}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 30 30"
        >
          <path
            fill="#fff"
            d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"
          ></path>
        </svg>
      </button>

      <InputRow>
        <TextInput
          label="User: Email"
          name={`new_users[${index}].email`}
          error={errors?.new_users?.[index]?.email?.message}
          required
        />
        <PhoneInput
          label="User: Phone"
          name={`new_users[${index}].phone`}
          required
          error={errors?.new_users?.[index]?.phone?.message}
        />
      </InputRow>
      <InputRow>
        <TextInput
          label="User: First Name"
          name={`new_users[${index}].first_name`}
          required
          error={errors?.new_users?.[index]?.first_name?.message}
        />
        <TextInput
          label="User: Last Name"
          name={`new_users[${index}].last_name`}
          required
          error={errors?.new_users?.[index]?.last_name?.message}
        />
      </InputRow>
      <SelectInput
        name={`new_users[${index}].role`}
        label="User: Job Role"
        required
        error={errors?.new_users?.[index]?.role?.message}
        options={userTypeOptions}
      />
    </div>
  );
}
