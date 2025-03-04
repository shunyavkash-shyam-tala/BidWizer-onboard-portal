import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormSecondaryHeader from "../global/inputs/FormSecondaryHeader";
import ExistingAdditionalContact from "./ExistingAdditionalContact";
import AddNewAdditionalUser from "./AddNewAdditionalUser";
import style from "./AdditionalContactContainer.module.css";

export default function AdditionalContactContainer() {
  const { control, clearErrors } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "new_users",
  });
  const addUser = () => {
    append({ email: "", phone: "", first_name: "", last_name: "", role: "" });
  };

  const removeUser = (index) => {
    remove(index);
    clearErrors("new_users");
  };

  return (
    <>
      <FormSecondaryHeader heading="Additional Users" />
      {[0, 1].map((index) => (
        <ExistingAdditionalContact key={index} index={index} />
      ))}

      {fields.map((user, index) => (
        <AddNewAdditionalUser
          key={user.id}
          index={index}
          onRemove={() => removeUser(index)}
        />
      ))}

      <div className={style.add_user_box}>
        <button type="button" className={style.text_btn} onClick={addUser}>
          <span className={style.button_text}>Add User</span>
        </button>
      </div>

      <hr className={style.horizontal_rule} />
    </>
  );
}
