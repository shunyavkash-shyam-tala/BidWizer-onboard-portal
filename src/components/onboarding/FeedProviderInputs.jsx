import React, { useEffect } from "react";
import FormSecondaryHeader from "../global/inputs/FormSecondaryHeader";
import FormSubTitle from "../global/inputs/FormSubTitle";
import SelectInput from "../global/inputs/SelectInput";
import InputRow from "../global/inputs/InputRow";
import feedProvider from "../../constants/feedProvider";
import TextInput from "../global/inputs/TextInput";
import useSetFormDefaults from "../../hooks/useSetFormDefaults";
import { useFormContext } from "react-hook-form";

const FeedProviderInputs = ({ defaultFormValues }) => {
  useSetFormDefaults(defaultFormValues);
  const { watch, setValue } = useFormContext();
  const inventoryFeedProviderId = watch("inventory_feed_provider_id");

  const inventoryFeedProviderOptions = [
    { disabled: true, selected: true, title: "" },
    ...feedProvider.map(({ id, provider }) => ({
      value: id,
      title: provider,
    })),
  ];

  useEffect(() => {
    if (inventoryFeedProviderId) {
      const chosenProvider = feedProvider.find(
        ({ id }) => id === inventoryFeedProviderId
      );
      if (chosenProvider) {
        setValue("inventory_feed_provider", chosenProvider.provider);
        setValue("inventory_feed_provider_name", chosenProvider.firstname);
        setValue("inventory_feed_provider_email", chosenProvider.email);
      }
    }
  }, [inventoryFeedProviderId, setValue]);

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
          disabled
        />
        <TextInput
          label="First Name"
          name="inventory_feed_provider_name"
          required
          disabled
        />
      </InputRow>
      <TextInput
        disabled
        label="Provider"
        name="inventory_feed_provider"
        required
      />
      <p>
        <i>Note: contacts may differ for each dealer</i>
      </p>
    </>
  );
};

export default FeedProviderInputs;
