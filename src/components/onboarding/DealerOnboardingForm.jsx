import React from "react";
import OnboardingFormLayout from "../layouts/OnboardingFormLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import DealerInputs from "./DealerInputs";
import PrimaryContactInputs from "./PrimaryContactInputs";
import FeedProviderInputs from "./FeedProviderInputs";
import InventoryAuthInputs from "./InventoryAuthInputs";
import DealerFeesInputs from "./DealerFeesInputs";
import InventoryDetailsInputs from "./InventoryDetailsInputs";
import DealFundingInputs from "./DealFundingInputs";
import AdditionalContactContainer from "./AdditionalContactContainer";
import PrimaryButton from "../global/buttons/PrimaryButton";
import { onboardingSchema } from "../../validators/onBoarding.schema";
import getContactsByTypeId from "../../utils/getContactsByTypeId";
import associationInfo from "../../constants/associatationInfo";
import feedProvider from "../../constants/feedProvider";

const DealerOnboardingForm = ({ selectedDealer }) => {
  const dealer = selectedDealer?.properties;
  const dealerInputsDefaultValue = {
    group_name: dealer?.group_name,
    name: dealer?.name,
    website: dealer?.domain,
    address: dealer?.address,
    city: dealer?.city,
    state: dealer?.state,
    zip: dealer?.zip,
    warranty_product: dealer?.warranty_product,
  };
  const associatedContact = selectedDealer?.associatedContacts;
  const primaryContact = getContactsByTypeId({
    contacts: associatedContact,
    typeId: associationInfo.primary.id,
  })[0];

  const defaultPrimaryContact = {
    id: primaryContact?.contactId,
    firstname: primaryContact?.properties?.firstname,
    lastname: primaryContact?.properties?.lastname,
    phone: primaryContact?.properties?.phone,
    email: primaryContact?.properties?.email,
  };

  const defaultInventoryFeedContact = {
    inventory_feed_provider_id: feedProvider?.filter(
      ({ provider }) => provider == dealer?.inventory_feed_provider
    )[0]?.id,
    inventory_feed_provider: dealer?.inventory_feed_provider,
    inventory_feed_provider_name: dealer?.inventory_feed_provider_name,
    inventory_feed_provider_email: dealer?.inventory_feed_provider_email,
  };

  const methods = useForm({
    resolver: yupResolver(onboardingSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <OnboardingFormLayout formTitle={"Dealership Info"}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DealerInputs defaultFormValues={dealerInputsDefaultValue} />
          <PrimaryContactInputs defaultFormValues={defaultPrimaryContact} />
          <FeedProviderInputs defaultFormValues={defaultInventoryFeedContact} />
          <InventoryAuthInputs />
          <DealerFeesInputs />
          <InventoryDetailsInputs />
          <DealFundingInputs />
          <AdditionalContactContainer />
          <PrimaryButton
            style={{ display: "block", marginLeft: "auto", marginTop: "15px" }}
          >
            Submit
          </PrimaryButton>
        </form>
      </FormProvider>
    </OnboardingFormLayout>
  );
};

export default DealerOnboardingForm;
