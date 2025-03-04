import React from "react";
import TextInput from "../global/inputs/TextInput";
import FormSubTitle from "../global/inputs/FormSubTitle";

export default function DealerFeesInputs() {
  return (
    <>
      <FormSubTitle title="Dealer Fees" sx={{ marginBlock: "40px" }} />
      <TextInput
        label="Dealer DOC / Admin Fees"
        name="dealer_doc___admin_fees"
        type="number"
        required
      />
      <TextInput
        label="Package Fee for New Cars"
        name="package_fee__if_any_"
        type="number"
        required
      />
      <TextInput
        label="Package Fee for Used Cars"
        name="used_car_package_fee"
        type="number"
        required
      />
    </>
  );
}
