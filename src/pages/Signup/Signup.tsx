import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Signup.module.scss";
import Form from "~/components/shared/form/Form";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { ROUTER_PATH } from "~/constant/common";
import FormItem from "~/components/shared/form/FormItem";
import Input from "~/components/shared/input/Input";
import Button from "~/components/shared/button/Button";
import { SignUpFormType, signUpSchema } from "~/constant/validation/authSchema";
import { authActions } from "~/redux/slice/authSlice";

const SignUpPage = () => {
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormType> = async (values) => {
    dispatch(authActions.signup(values));
    setTimeout(() => {
      navigate(ROUTER_PATH.login);
    }, 1500);
  };

  const handleLogin = () => {
    navigate(ROUTER_PATH.login);
  };

  return (
    <div className={styles["signupPage"]}>
      <h3 className={styles["signupPage__title"]}>Sign up</h3>
      <div className={styles["signupPage__form"]}>
        <Form {...form} onSubmit={onSubmit}>
          <FormItem<SignUpFormType> name="name" label="Name" required>
            <Input placeholder="Enter your name" type="text" />
          </FormItem>

          <FormItem<SignUpFormType> name="email" label="Email" required>
            <Input placeholder="joe@email.com" type="email" />
          </FormItem>

          <FormItem<SignUpFormType> name="password" label="Password" required>
            <Input
              placeholder="Enter your password"
              type="password"
              autoComplete="on"
            />
          </FormItem>

          <div className={styles["signupPage__empty"]}></div>

          <Button
            type="submit"
            block
            size="large"
            color="danger"
            loading={isLoading}
          >
            Sign up
          </Button>

          <div className={styles["signupPage__login"]}>
            Already have an account? <b onClick={handleLogin}>Login here.</b>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
