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

const DealerOnboardingForm = ({ selectedDealer }) => {
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
          <DealerInputs />
          <PrimaryContactInputs />
          <FeedProviderInputs />
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
