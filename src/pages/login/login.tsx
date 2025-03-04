import React, {useCallback, useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import styles from './login.module.scss';
import Form from '@/components/Common/Form/Form';
import {LogInFormType, loginSchema} from '@/constant/validation/authSchema';
import {useAppDispatch, useAppSelector} from '@/redux/store';
import {ROUTER_PATH} from '@/constant/common';
import FormItem from '@/components/Common/FormItem/FormItem';
import Input from '@/components/Common/Input/Input';
import Button from '@/components/Common/Button/Button';
import {authActions} from '@/redux/slice/authSlice';

export const defaultLoginValues: LogInFormType = {
  email: 'allow_access@gmail.com',
  password: 'Abc@12345',
};

const LoginPage = () => {
  const {isLoading, isAuthenticated} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: defaultLoginValues,
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const {control, formState} = form;
  const {isValid} = formState;

  const onSubmit: SubmitHandler<LogInFormType> = useCallback(
    (values) => {
      dispatch(authActions.login(values));
    },
    [dispatch]
  );

  const navigateToSignUp = useCallback(() => {
    navigate(ROUTER_PATH.signup);
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTER_PATH.home, {replace: true});
    }
  }, [isAuthenticated]);

  return (
    <div className={styles['login-page']}>
      <h3 className={styles['login-page__title']}>Log in</h3>

      <div className={styles['login-page__form']}>
        <Form formMethods={form} onSubmit={onSubmit}>
          <Controller
            control={control}
            name="email"
            render={({field}) => (
              <FormItem<LogInFormType> name="email" label="Email" required>
                <Input {...field} placeholder="Enter your email" type="email" />
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({field}) => (
              <FormItem<LogInFormType>
                name="password"
                label="Password"
                required>
                <Input
                  {...field}
                  placeholder="Enter your password"
                  type="password"
                  autoComplete="on"
                />
              </FormItem>
            )}
          />

          <div className={styles['login-page__forgot']} onClick={() => {}}>
            Forgot password?
          </div>

          <Button
            type="submit"
            block
            size="large"
            color="danger"
            loading={isLoading}
            disabled={!isValid || isLoading}>
            Log in
          </Button>

          <div className={styles['login-page__signup']}>
            Don't have an account?{' '}
            <b onClick={navigateToSignUp}>Register here.</b>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
