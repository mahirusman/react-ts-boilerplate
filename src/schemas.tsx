import * as yup from "yup";
import enStrings from "./localization/en";

export const Fields = {
  email: "email",
  password: "password",
  password2: "password2",
  firstName: "first_name",
  lastName: "last_name",
  phone: "phone",
  acceptedTOS: "accepted_tos",
  verificationCode: "code",
  text: "text",
  plan: "plan",
  problems: "problems",
};

export const requiredEmailSchema = yup.string().email("invalid").required("required");

export const requiredLoginPasswordSchema = yup.string().required("required");

export const requiredPasswordSchema = yup
  .string()
  .min(8, enStrings.auth.errors.min(8))
  .max(50, enStrings.auth.errors.max(50))
  .required(enStrings.auth.passwordValidErr.empty);

export const requiredPassword2Schema = yup
  .string()
  .oneOf([yup.ref(Fields.password)], enStrings.auth.errors.passwordsDoesNotMatch)
  .required(enStrings.auth.errors.passwordsDoesNotMatch);

export const requiredCheckboxSchema = yup.boolean().oneOf([true]).required();

export const requiredFirstNameSchema = yup
  .string()
  .max(16, enStrings.auth.errors.max(16))
  .required(enStrings.auth.errors.emptyFirstName);

export const requiredLastNameSchema = yup
  .string()
  .max(16, enStrings.auth.errors.max(16))
  .required(enStrings.auth.errors.emptyLastName);

export const requiredPhoneNumberSchema = yup.string().required(enStrings.auth.errors.emptyPhoneNumber);

export const requiredBirthdaySchema = yup.string().required(enStrings.auth.errors.emptyBirthday);

export const requiredVerificationCodeSchema = yup
  .number()
  .required(enStrings.auth.errors.invalidVerificationCode);

export const LoginSchema = yup.object().shape({
  [Fields.email]: requiredEmailSchema,
  [Fields.password]: requiredLoginPasswordSchema,
});
