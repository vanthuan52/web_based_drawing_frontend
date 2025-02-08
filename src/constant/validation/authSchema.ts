import * as yup from "yup";
import { InferType } from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type LogInFormType = InferType<typeof loginSchema>;

export const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type SignUpFormType = InferType<typeof signUpSchema>;
