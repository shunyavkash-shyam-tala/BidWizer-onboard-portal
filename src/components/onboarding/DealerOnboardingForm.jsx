import React from "react";
import OnboardingFormLayout from "../layouts/OnboardingFormLayout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import DealerInputs from "./DealerInputs";
import PrimaryContactInputs from "./PrimaryContactInputs";
import FeedProviderInputs from "./FeedProviderInputs";
import InventoryAuthInputs from "./InventoryAuthInputs";
import DealerFeesInputs from "./DealerFeesInputs";

const schema = yup.object().shape({
  name: yup.string().required("Dealership/Company Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup
    .string()
    .required("ZIP code is required")
    .matches(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .test("isValidPhone", "Please enter valid phone number", (value) => {
      if (!value) return false;
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber ? phoneNumber.isValid() : false;
    })
    .required("Phone number is required"),
  inventory_feed_provider_id: yup
    .string()
    .required("Inventory feed provider is required"),
  inventory_feed_provider_email: yup
    .string()
    .email("Invalid email format")
    .required("Inventory feed provider email is required"),
  inventory_feed_provider_name: yup
    .string()
    .required("Inventory feed provider name is required"),
  inventory_feed_provider: yup
    .string()
    .required("Inventory feed provider is required"),

  dealer_inventory_authorizer_email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  dealer_inventory_authorizer_first_name: yup
    .string()
    .required("First name is required"),
  dealer_inventory_authorizer_last_name: yup
    .string()
    .required("Last name is required"),
  dealer_inventory_authorizer_phone: yup
    .string()
    .required("Phone number is required")
    .test("isValidPhone", "Please enter valid phone number", (value) => {
      if (!value) return false;
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber ? phoneNumber.isValid() : false;
    }),

  dealer_doc___admin_fees: yup
    .number()
    .typeError("Dealer DOC / Admin Fees must be a number")
    .required("Dealer DOC / Admin Fees is required"),
  package_fee__if_any_: yup
    .number("Please enter valid amount")
    .typeError("Package Fee for New Cars must be a number")
    .required("Package Fee for New Cars is required"),
  used_car_package_fee: yup
    .number("Please enter valid amount")
    .typeError("Package Fee for Used Cars must be a number")
    .required("Package Fee for Used Cars is required"),
});

const DealerOnboardingForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
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
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </OnboardingFormLayout>
  );
};

export default DealerOnboardingForm;
