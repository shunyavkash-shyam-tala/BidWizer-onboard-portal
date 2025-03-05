import React, { useCallback, useState } from "react";
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
import { prepareOnboardingPayload } from "../../helpers/onbarding";
import useApiCall from "../../hooks/useApiCall";
import apis from "../../constants/apiCenter";

const DealerOnboardingForm = ({ selectedDealer }) => {
  const { loading, response, apiCall } = useApiCall();
  console.log(response);
  const associateCompanyId = selectedDealer?.id;
  const dealer = selectedDealer?.properties;
  const dealerInputsDefaultValue = {
    group_name: dealer?.group_name,
    dealer_id: dealer?.id,
    hs_owner_email: dealer?.hs_owner_email,
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

  const [removeAdditionalUserAssociation, setRemoveAdditionalUserAssociation] =
    useState([]);
  function removeAssociation(association) {
    setRemoveAdditionalUserAssociation((prev) => [...prev, association]);
  }
  const [removeAssociationContacts, setRemoveAssociationContacts] = useState(
    []
  );
  function removePrimaryAssociationContact() {
    const contactPayload = [
      {
        associationType: "administrator",
        toObjectId: defaultPrimaryContact?.id,
        ...defaultPrimaryContact,
      },
      {
        associationType: "primary",
        toObjectId: defaultPrimaryContact?.id,
        ...defaultPrimaryContact,
      },
    ];
    setRemoveAssociationContacts(contactPayload);
  }

  const [currentAdditionalUser, setCurrentAdditionalUser] = useState([]);

  const onSubmit = useCallback(
    async (data) => {
      console.log("Form Data:", data);
      const body = prepareOnboardingPayload({
        associateCompanyId,
        ...data,
        currentAdditionalUser,
        removeAdditionalUserAssociation,
        removeAssociationContacts,
      });
      let res = await apiCall({
        ...apis.dealer.onboarding,
        body,
      });
      console.log(res);
    },
    [
      apiCall,
      associateCompanyId,
      removeAdditionalUserAssociation,
      removeAssociationContacts,
      currentAdditionalUser,
    ]
  );
  return (
    <OnboardingFormLayout formTitle={"Dealership Info"}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DealerInputs defaultFormValues={dealerInputsDefaultValue} />
          <PrimaryContactInputs
            defaultFormValues={defaultPrimaryContact}
            updatePrimaryContact={removePrimaryAssociationContact}
          />
          <FeedProviderInputs defaultFormValues={defaultInventoryFeedContact} />
          <InventoryAuthInputs
            defaultFormValues={inventoryAuthInputsDefaultValues}
          />
          <DealerFeesInputs defaultFormValues={dealerFees} />
          <InventoryDetailsInputs
            defaultFormValues={inventoryDetailsInputsValues}
          />
          <DealFundingInputs defaultFormValues={dealFundingInputsValues} />
          <AdditionalContactContainer
            existingContacts={selectedDealer?.associatedContacts}
            removeAssociation={removeAssociation}
            setCurrentAdditionalUser={setCurrentAdditionalUser}
          />
          <PrimaryButton
            loading={loading}
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
