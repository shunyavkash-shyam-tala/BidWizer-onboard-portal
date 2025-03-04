import React from "react";
import FormSecondaryHeader from "../global/inputs/FormSecondaryHeader";
import FormSubTitle from "../global/inputs/FormSubTitle";
import TextInput from "../global/inputs/TextInput";
import InputRow from "../global/inputs/InputRow";
import PhoneInput from "../global/inputs/PhoneInput";

export default function PrimaryContactInputs() {
  return (
    <>
      <FormSecondaryHeader heading="Primary Contact" action />
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
}
