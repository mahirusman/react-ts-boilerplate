import { every, get, some } from "lodash";
import * as yup from "yup";

import { ChecklistInputItem, NutritionItem, StretchingValue } from "@/types";

import { Regex } from "../constants";
import Strings from "../localization";

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

export const requiredEmailSchema = yup
  .string()
  .email(Strings.auth.errors.invalidEmail)
  .required(Strings.auth.errors.emptyEmail);

export const requiredLoginPasswordSchema = yup
  .string()
  .required(Strings.auth.errors.emptyPassword);

export const requiredPasswordSchema = yup
  .string()
  .min(8, Strings.auth.errors.min(8))
  .max(50, Strings.auth.errors.max(50))
  .matches(Regex.oneNumber, Strings.auth.passwordValidErr.oneNumber)
  .matches(Regex.oneSpecialChar, Strings.auth.passwordValidErr.oneSpecialChar)
  .required(Strings.auth.passwordValidErr.empty);

export const requiredPassword2Schema = yup
  .string()
  .oneOf([yup.ref(Fields.password)], Strings.auth.errors.passwordsDoesNotMatch)
  .required(Strings.auth.errors.passwordsDoesNotMatch);

export const requiredCheckboxSchema = yup.boolean().oneOf([true]).required();

export const requiredFirstNameSchema = yup
  .string()
  .max(16, Strings.auth.errors.max(16))
  .required(Strings.auth.errors.emptyFirstName);

export const requiredLastNameSchema = yup
  .string()
  .max(16, Strings.auth.errors.max(16))
  .required(Strings.auth.errors.emptyLastName);

export const requiredPhoneNumberSchema = yup
  .string()
  .required(Strings.auth.errors.emptyPhoneNumber);

export const requiredBirthdaySchema = yup
  .string()
  .required(Strings.auth.errors.emptyBirthday);

export const requiredVerificationCodeSchema = yup
  .number()
  .required(Strings.auth.errors.invalidVerificationCode);

export const optionalMultilineSchema = yup.string();

export const optionalImageUploaderSchema = yup.string();

export const requiredMultilineSchema = optionalMultilineSchema.required(
  Strings.habit.errors.pleaseAnswer
);

export const requiredImageUploaderSchema = optionalImageUploaderSchema.required(
  Strings.habit.errors.pleaseUploader
);

export const optionalSingleConfirmationSchema = yup.boolean();

export const requiredSingleConfirmationSchema = optionalSingleConfirmationSchema
  .oneOf([true], Strings.habit.errors.pleaseCheck)
  .required(Strings.habit.errors.pleaseCheck);

export const optionalChecklistInputSchema = yup.array();

export const requiredChecklistInputSchema = optionalChecklistInputSchema
  .min(1, Strings.habit.errors.pleaseEnterAtLeastOne)
  .test("", Strings.habit.errors.pleaseEnterAtLeastOne, (value) =>
    some(value, (vl: ChecklistInputItem) => !!vl.value)
  );

export const requiredNutritionInputSchema = optionalChecklistInputSchema
  .min(1, Strings.habit.errors.pleaseEnterAtLeastOne)
  .test("", Strings.habit.errors.pleaseEnter, (value) =>
    every(value, (vl: NutritionItem) => !!vl.value)
  );

export const requiredStretchingInputSchema = yup
  .object<StretchingValue>()
  .test(
    "",
    Strings.habit.errors.pleaseEnter,
    (value) => !!value?.level || get(value, "skip", false)
  );

export const requiredChecklistSchema = yup.array();

export const requiredMultipleChoiceSchema = (min: number) => {
  const schema = yup.array();

  if (min > 0) {
    schema
      .required(Strings.habit.errors.pleaseOneOrMore)
      .min(min, Strings.habit.errors.minMultipleChoice(min));
  }

  return schema;
};

export const problemSchema = yup
  .array()
  .required(Strings.habit.errors.pleaseOneOrMore)
  .min(1, Strings.habit.errors.minMultipleChoice(1));

export const requiredRadioGroup = yup.string().required();

export const LoginSchema = yup.object().shape({
  [Fields.email]: requiredEmailSchema,
  [Fields.password]: requiredLoginPasswordSchema,
});
