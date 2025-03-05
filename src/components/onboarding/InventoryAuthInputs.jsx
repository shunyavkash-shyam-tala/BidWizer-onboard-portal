import React from "react";
import FormSubTitle from "../global/inputs/FormSubTitle";
import TextInput from "../global/inputs/TextInput";
import InputRow from "../global/inputs/InputRow";
import PhoneInput from "../global/inputs/PhoneInput";
import useSetFormDefaults from "../../hooks/useSetFormDefaults";

export default function InventoryAuthInputs({ defaultFormValues }) {
  useSetFormDefaults(defaultFormValues);
  return (
    <>
      <FormSubTitle
        title="Dealer Inventory Authorizer"
        sx={{ marginBlock: "40px" }}
      />
      <TextInput
        label="Email"
        name="dealer_inventory_authorizer_email"
        required
      />
      <InputRow>
        <TextInput
          label="First Name"
          name="dealer_inventory_authorizer_first_name"
          required
        />
        <TextInput
          label="Last Name"
          name="dealer_inventory_authorizer_last_name"
          required
        />
      </InputRow>
      <PhoneInput
        label="Phone Number"
        name="dealer_inventory_authorizer_phone"
        required
      />
    </>
  );
}
