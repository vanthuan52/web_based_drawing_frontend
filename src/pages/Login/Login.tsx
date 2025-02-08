import React, { useEffect } from "react";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Login.module.scss";
import Form from "~/components/shared/form/Form";
import { LogInFormType, loginSchema } from "~/constant/validation/authSchema";
import { useAppDispatch, useAppSelector } from "~/redux/store";
import { ROUTER_PATH } from "~/constant/common";
import FormItem from "~/components/shared/form/FormItem";
import Input from "~/components/shared/input/Input";
import Button from "~/components/shared/button/Button";
import { authActions } from "~/redux/slice/authSlice";

const LoginPage = () => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "Abc@12345",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LogInFormType> = async (values) => {
    dispatch(authActions.login(values));
  };

  const handleSignup = () => {
    navigate(ROUTER_PATH.signup);
  };

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTER_PATH.home, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className={styles["loginPage"]}>
      <h3 className={styles["loginPage__title"]}>Log in</h3>
      <div className={styles["loginPage__form"]}>
        <Form {...form} onSubmit={onSubmit}>
          <FormItem<LogInFormType> name="email" label="Email" required>
            <Input placeholder="joe@email.com" type="email" />
          </FormItem>

          <FormItem<LogInFormType> name="password" label="Password" required>
            <Input
              placeholder="Enter your password"
              type="password"
              autoComplete="on"
            />
          </FormItem>

          <div className={styles["loginPage__forgot"]}>Forgot password?</div>

          <Button
            type="submit"
            block
            size="large"
            color="danger"
            loading={isLoading}
          >
            Log in
          </Button>

          <div className={styles["loginPage__signup"]}>
            Don't have an account? <b onClick={handleSignup}>Register here.</b>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
