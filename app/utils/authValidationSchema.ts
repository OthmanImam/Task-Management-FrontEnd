import { FormData } from "../shared/types";
import * as Yup from "yup";

//  Validations
const emailValidation = Yup.string()
  .email("Invalid email address")
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Invalid email address. Please include a valid email address."
  )
  .required("Email is required!");

const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .matches(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.*[a-z])/,
    "Password must include at least one uppercase letter, one lowercase letter, one special character, and one number."
  )
  .required("Password is required");

// Initial values
export const initialValues = {
  signUp: { email: "", password: "" } as FormData,
  logIn: { email: "", password: "" } as FormData,
};

// Schemas
export const schemas = {
  authValidationSchema: Yup.object({
    email: emailValidation,
    password: passwordValidation,
  }),
  forgotPasswordSchema: Yup.object({
    email: emailValidation,
  }),
  resetPasswordSchema: Yup.object().shape({
    password: passwordValidation,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  }),
};

export const {
  authValidationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = schemas;

export { emailValidation, passwordValidation };
