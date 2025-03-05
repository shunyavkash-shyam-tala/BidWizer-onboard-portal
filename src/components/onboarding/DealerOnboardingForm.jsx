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
import associationInfo from "../../constants/associationInfo";
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

  const inventoryAuthInputsDefaultValues = {
    dealer_inventory_authorizer_email:
      dealer?.dealer_inventory_authorizer_email,
    dealer_inventory_authorizer_first_name:
      dealer?.dealer_inventory_authorizer_first_name,
    dealer_inventory_authorizer_last_name:
      dealer?.dealer_inventory_authorizer_last_name,
    dealer_inventory_authorizer_phone:
      dealer?.dealer_inventory_authorizer_phone,
  };

  const dealerFees = {
    dealer_doc___admin_fees: dealer?.dealer_doc___admin_fees,
    package_fee__if_any_: dealer?.package_fee__if_any_,
    used_car_package_fee: dealer?.used_car_package_fee,
  };

  const inventoryDetailsInputsValues = {
    is_the_inventory_combined_with_another_store_:
      dealer?.is_the_inventory_combined_with_another_store_,
    inventory_ok_to_stay_combined_: dealer?.inventory_ok_to_stay_combined_,
    separate_new_inventory_: dealer?.separate_new_inventory_,
    stock_number_differentiator: dealer?.stock_number_differentiator,
    separate_used_inventory_: dealer?.separate_used_inventory_,
    stock_number_differentiator__used_:
      dealer?.stock_number_differentiator__used_,
    include_in_transit_new_vehicles:
      dealer?.include_in_transit_new_vehicles === "true" ? true : false,
  };

  const dealFundingInputsValues = {
    deal_funding_contact_email: dealer?.deal_funding_contact_email,
    deal_funding_contact_first_name: dealer?.deal_funding_contact_first_name,
    deal_funding_contact_last_name: dealer?.deal_funding_contact_last_name,
    deal_funding_contact_phone: dealer?.deal_funding_contact_phone,
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
          <InventoryAuthInputs
            defaultFormValues={inventoryAuthInputsDefaultValues}
          />
          <DealerFeesInputs defaultFormValues={dealerFees} />
          <InventoryDetailsInputs
            defaultFormValues={inventoryDetailsInputsValues}
          />
          <DealFundingInputs defaultFormValues={dealFundingInputsValues} />
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
