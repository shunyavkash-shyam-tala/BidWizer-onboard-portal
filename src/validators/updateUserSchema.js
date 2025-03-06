import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const updateUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().test("isValidPhone", "Invalid phone number", (value) => {
    if (value.length <= 2) return true;
    const phoneNumber = parsePhoneNumberFromString(value);
    return phoneNumber ? phoneNumber.isValid() : false;
  }),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  role: yup.string().required("Role is required"),
});

export default updateUserSchema;
