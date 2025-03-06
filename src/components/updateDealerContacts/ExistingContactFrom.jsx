import React, { useState } from "react";
import style from "./ExistingContactFrom.module.css";
import TextInput from "../global/inputs/TextInput";
import InputRow from "../global/inputs/InputRow";
import SelectInput from "../global/inputs/SelectInput";
import { FormProvider, useForm } from "react-hook-form";
import PhoneInput from "../global/inputs/PhoneInput";
import PrimaryButton from "../global/buttons/PrimaryButton";
import useSetFormDefaults from "../../hooks/useSetFormDefaults";
import RemoveContactModal from "./RemoveContactModal";
export default function ExistingContactFrom({
  companyId,
  userInfo = {},
  onRemove,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm({});
  useSetFormDefaults(userInfo, true, methods?.setValue);

  const userTypeOptions = [
    { title: "", selected: true },
    { title: "Administrator", value: "administrator" },
    { title: "Bidder", value: "bidder" },
  ];

  return (
    <>
      <div className={style.additional_contact_input} id={userInfo?.contactId}>
        <FormProvider {...methods}>
          <InputRow>
            <TextInput label="User: Email" name="email" required disabled />
            <PhoneInput label="User: Phone" name="phone" required disabled />
          </InputRow>
          <InputRow>
            <TextInput
              label="User: First Name"
              name="firstname"
              required
              disabled
            />
            <TextInput
              label="User: Last Name"
              name="lastname"
              required
              disabled
            />
          </InputRow>
          <SelectInput
            label="User: Job Role"
            name="role"
            required
            disabled
            options={userTypeOptions}
          />
        </FormProvider>
        <div className={style.btn_group}>
          <PrimaryButton
            style={{ backgroundColor: "var(--danger-btn)", boxShadow: "none" }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Remove Contact
          </PrimaryButton>
          <PrimaryButton style={{ boxShadow: "none" }}>
            Update Contact
          </PrimaryButton>
        </div>
      </div>
      <RemoveContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={userInfo?.email}
        companyId={companyId}
        userInfo={userInfo}
        onRemoveCb={() => {
          onRemove(userInfo?.contactId);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
