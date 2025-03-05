import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const onboardingSchema = yup.object().shape({
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

  is_the_inventory_combined_with_another_store_: yup
    .string()
    .required("This field is required"),

  inventory_ok_to_stay_combined_: yup
    .string()
    .when("is_the_inventory_combined_with_another_store_", {
      is: "Yes",
      then: (schema) =>
        schema.required("This field is required when inventory is combined"),
      otherwise: (schema) => schema.notRequired(),
    }),

  separate_new_inventory_: yup.string().when("inventory_ok_to_stay_combined_", {
    is: "No",
    then: (schema) =>
      schema.required(
        "This field is required when inventory cannot stay combined"
      ),
    otherwise: (schema) => schema.notRequired(),
  }),

  separate_used_inventory_: yup
    .string()
    .when("inventory_ok_to_stay_combined_", {
      is: "No",
      then: (schema) =>
        schema.required(
          "This field is required when inventory cannot stay combined"
        ),
      otherwise: (schema) => schema.notRequired(),
    }),

  stock_number_differentiator: yup.string().when("separate_new_inventory_", {
    is: "Yes",
    then: (schema) =>
      schema.required("Stock Number Differentiator (New) is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  stock_number_differentiator__used_: yup
    .string()
    .when("separate_used_inventory_", {
      is: "Yes",
      then: (schema) =>
        schema.required("Stock Number Differentiator (Used) is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  deal_funding_contact_email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  deal_funding_contact_first_name: yup
    .string()
    .required("First name is required"),
  deal_funding_contact_last_name: yup
    .string()
    .required("Last name is required"),
  deal_funding_contact_phone: yup
    .string()
    .required("Phone number is required")
    .test("isValidPhone", "Please enter valid phone number", (value) => {
      if (!value) return false;
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber ? phoneNumber.isValid() : false;
    }),

  new_users: yup.array().of(
    yup.object().shape({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: yup
        .string()
        .test("isValidPhone", "Invalid phone number", (value) => {
          if (value.length <= 2) return true;
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber ? phoneNumber.isValid() : false;
        }),
      first_name: yup.string().required("First name is required"),
      last_name: yup.string().required("Last name is required"),
      role: yup.string().required("Role is required"),
    })
  ),
});
