import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import DealerInputs from "../onboarding/DealerInputs";
import useApiCall from "../../hooks/useApiCall";
import FeedProviderInputs from "../onboarding/FeedProviderInputs";
import feedProvider from "../../constants/feedProvider";
import InventoryAuthInputs from "../onboarding/InventoryAuthInputs";
import DealerFeesInputs from "../onboarding/DealerFeesInputs";
import InventoryDetailsInputs from "../onboarding/InventoryDetailsInputs";
import DealFundingInputs from "../onboarding/DealFundingInputs";
import dealerUpdateSchema from "../../validators/dealerUpdate.schema";
import PrimaryButton from "../global/buttons/PrimaryButton";
import apis from "../../constants/apiCenter";
import useToast from "../../hooks/context/toast/useToast";

export default function UpdateDealerForm({ selectedDealer }) {
  const { loading, apiCall } = useApiCall();
  const { showToast } = useToast();
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
    resolver: yupResolver(dealerUpdateSchema),
  });

  async function onSubmit(data) {
    delete data?.inventory_feed_provider_id;
    try {
      await apiCall({
        ...apis.dealer.dealerUpdate,
        body: { associateCompanyId, company: data },
      });
      showToast({ message: "Dealer updated successfully." });
    } catch (error) {
      console.error(error);
      showToast({ type: "error", message: "failed to update dealer." });
    }
  }
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DealerInputs defaultFormValues={dealerInputsDefaultValue} />
          <FeedProviderInputs defaultFormValues={defaultInventoryFeedContact} />
          <InventoryAuthInputs
            defaultFormValues={inventoryAuthInputsDefaultValues}
          />
          <DealerFeesInputs defaultFormValues={dealerFees} />
          <InventoryDetailsInputs
            defaultFormValues={inventoryDetailsInputsValues}
          />
          <DealFundingInputs defaultFormValues={dealFundingInputsValues} />
          <PrimaryButton
            loading={loading}
            style={{
              display: "block",
              marginLeft: "auto",
              marginTop: "15px",
            }}
          >
            Submit
          </PrimaryButton>
        </form>
      </FormProvider>
    </>
  );
}
