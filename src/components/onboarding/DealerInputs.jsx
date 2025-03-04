import React from "react";
import TextInput from "../global/inputs/TextInput";
import InputRow from "../global/inputs/InputRow";

export default function DealerInputs() {
  return (
    <>
      <TextInput label="Group Name" name="group_name" />
      <TextInput label="Dealership/Company Name" name="name" required />
      <TextInput label="Website URL" name="website" />
      <TextInput label="Street Address" name="address" />
      <InputRow>
        <TextInput label="City" name="city" required />
        <TextInput label="State/Region" name="state" required />
        <TextInput label="Postal Code" name="zip" type="number" required />
      </InputRow>
      <TextInput
        label="Warranty Product"
        name="warranty_product"
        type="number"
      />
    </>
  );
}
