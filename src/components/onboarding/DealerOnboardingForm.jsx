import React from "react";
import OnboardingFormLayout from "../layouts/OnboardingFormLayout";
import TextInput from "../global/inputs/TextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import InputRow from "../global/inputs/InputRow";
import FormSecondaryHeader from "../global/inputs/formSecondaryHeader";
import FormSubTitle from "../global/inputs/FormSubTitle";
import PhoneInput from "../global/inputs/PhoneInput";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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
    .test("isValidPhone", "Please valid phone number", (value) => {
      if (!value) return false;
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber ? phoneNumber.isValid() : false;
    })
    .required("Phone number is required"),
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

          {/* code for primary contact */}
          <FormSecondaryHeader heading="Primary Contact" action />
          <FormSubTitle title="User Responsible for Onboarding" />
          <input name="id" type="hidden" />
          <TextInput label="email" name="email" type="email" required />
          <InputRow>
            <TextInput label="First Name" name="firstname" required />
            <TextInput label="Last Name" name="lastname" required />
          </InputRow>
          <PhoneInput label="Phone Number" name="phone" required />

          {/* Dealer Inventory Feed Information */}
          <FormSecondaryHeader heading="Dealer Inventory Feed Information" />
          <FormSubTitle title="Inventory Feed Provider Representative" />

          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </OnboardingFormLayout>
  );
};

export default DealerOnboardingForm;
