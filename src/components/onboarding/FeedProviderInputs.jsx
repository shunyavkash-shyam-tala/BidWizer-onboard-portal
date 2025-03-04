import React from "react";
import FormSecondaryHeader from "../global/inputs/FormSecondaryHeader";
import FormSubTitle from "../global/inputs/FormSubTitle";
import SelectInput from "../global/inputs/SelectInput";
import InputRow from "../global/inputs/InputRow";
import feedProvider from "../../constants/feedProvider";
import TextInput from "../global/inputs/TextInput";

const FeedProviderInputs = () => {
  const inventoryFeedProviderOptions = [
    { disabled: true, selected: true, title: "" },
    ...feedProvider.map((option) => ({
      value: option?.id,
      title: option.firstname,
    })),
  ];
  return (
    <>
      <FormSecondaryHeader heading="Dealer Inventory Feed Information" />
      <FormSubTitle title="Inventory Feed Provider Representative" />
      <SelectInput
        name="inventory_feed_provider_id"
        label="Choose Inventory Feed Provider"
        required
        options={inventoryFeedProviderOptions}
      />
      <InputRow>
        <TextInput
          label="Email"
          name="inventory_feed_provider_email"
          required
        />
        <TextInput
          label="First Name"
          name="inventory_feed_provider_name"
          required
        />
      </InputRow>
      <TextInput label="Provider" name="inventory_feed_provider" required />
      <p>
        <i>Note: contacts may differ for each dealer</i>
      </p>
    </>
  );
};

export default FeedProviderInputs;
