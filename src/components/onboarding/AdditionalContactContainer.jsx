import React, { useEffect, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormSecondaryHeader from "../global/inputs/FormSecondaryHeader";
import ExistingAdditionalContact from "./ExistingAdditionalContact";
import AddNewAdditionalUser from "./AddNewAdditionalUser";
import style from "./AdditionalContactContainer.module.css";
import getContactsByTypeId from "../../utils/getContactsByTypeId";
import associationInfo from "../../constants/associationInfo";

export default function AdditionalContactContainer({
  existingContacts,
  removeAssociation,
  setCurrentAdditionalUser,
}) {
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

  const additionalUsers = useMemo(() => {
    const adminContacts = existingContacts
      ? getContactsByTypeId({
          contacts: existingContacts,
          typeId: associationInfo.administrator.id,
          excludeTypeId: associationInfo.primary.id,
        }).map((contact) => ({
          associationType: associationInfo.administrator.label,
          ...contact,
        }))
      : [];

    const bidderContacts = existingContacts
      ? getContactsByTypeId({
          contacts: existingContacts,
          typeId: associationInfo?.bidder?.id,
        }).map((contact) => ({
          associationType: associationInfo.bidder.label,
          ...contact,
        }))
      : [];

    return [...bidderContacts, ...adminContacts];
  }, [existingContacts]);

  useEffect(() => {
    if (additionalUsers.length) {
      setCurrentAdditionalUser(additionalUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalUsers]);

  return (
    <>
      <FormSecondaryHeader heading="Additional Users" />
      {additionalUsers.map((user, index) => (
        <ExistingAdditionalContact
          key={index}
          index={index}
          userInfo={user}
          removeAssociation={() => {
            removeAssociation({
              associationType: user?.associationType,
              ...user?.properties,
            });
          }}
        />
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
