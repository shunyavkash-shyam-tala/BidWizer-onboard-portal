import React, { memo, useCallback, useState } from "react";
import FormSecondaryHeader from "../global/inputs/FormSecondaryHeader";
import FormSubTitle from "../global/inputs/FormSubTitle";
import TextInput from "../global/inputs/TextInput";
import InputRow from "../global/inputs/InputRow";
import PhoneInput from "../global/inputs/PhoneInput";
import useSetFormDefaults from "../../hooks/useSetFormDefaults";
import { useFormContext } from "react-hook-form";

const PrimaryContactInputs = memo(({ defaultFormValues }) => {
  const { setValue } = useFormContext();
  useSetFormDefaults(defaultFormValues);
  const [showEditBtn, setShowEditBtn] = useState(true);
  const changePrimaryContact = useCallback(() => {
    setValue("id", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("firstname", "");
    setValue("lastname", "");
    setShowEditBtn(false);
  }, [setValue]);

  return (
    <>
      <FormSecondaryHeader
        heading="Primary Contact"
        action={showEditBtn}
        actionEventHandler={changePrimaryContact}
      />
      <FormSubTitle title="User Responsible for Onboarding" />
      <input name="id" type="hidden" />
      <TextInput label="Email" name="email" type="email" required />
      <InputRow>
        <TextInput label="First Name" name="firstname" required />
        <TextInput label="Last Name" name="lastname" required />
      </InputRow>
      <PhoneInput label="Phone Number" name="phone" required />
    </>
  );
});

export default PrimaryContactInputs;
