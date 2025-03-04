import React from "react";
import FormSecondaryHeader from "../global/inputs/FormSecondaryHeader";
import TextInput from "../global/inputs/TextInput";
import PhoneInput from "../global/inputs/PhoneInput";
import InputRow from "../global/inputs/InputRow";

export default function DealFundingInputs() {
  return (
    <>
      <FormSecondaryHeader heading="Deal Funding Contact" />
      <TextInput
        label="Email"
        name="deal_funding_contact_email"
        type="email"
        required
      />
      <InputRow>
        <TextInput
          label="First Name"
          name="deal_funding_contact_first_name"
          required
        />
        <TextInput
          label="Last Name"
          name="deal_funding_contact_last_name"
          required
        />
      </InputRow>
      <PhoneInput
        label="Phone Number"
        name="deal_funding_contact_phone"
        required
      />
    </>
  );
}
