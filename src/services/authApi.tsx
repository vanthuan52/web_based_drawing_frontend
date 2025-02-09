import axios from "~/libs/axios";
import {
  LogInFormType,
  SignUpFormType,
} from "~/constant/validation/authSchema";
import { IResponse } from "~/types/common";

const logIn = async (data: LogInFormType) => {
  return axios.post<IResponse>("/auth/signin", data);
};

const signUp = async (data: SignUpFormType) => {
  return axios.post<IResponse>("/auth/signup", data);
};

const authApi = {
  logIn,
  signUp,
};

export default authApi;
