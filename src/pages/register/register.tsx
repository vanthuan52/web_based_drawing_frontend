import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import styles from './register.module.scss';
import Form from '@/components/Common/Form/Form';
import {useAppDispatch, useAppSelector} from '@/redux/store';
import {ROUTER_PATH} from '@/constant/common';
import FormItem from '@/components/Common/FormItem/FormItem';
import Input from '@/components/Common/Input/Input';
import Button from '@/components/Common/Button/Button';
import {SignUpFormType, signUpSchema} from '@/constant/validation/authSchema';
import {authActions} from '@/redux/slice/authSlice';

const defaultValues: SignUpFormType = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const {isLoading} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues,
    resolver: yupResolver(signUpSchema),
    mode: 'onTouched',
  });

  const {control, formState} = form;
  const {isValid} = formState;

  const onSubmit: SubmitHandler<SignUpFormType> = useCallback(
    (values) => {
      dispatch(authActions.signup(values));
    },
    [dispatch]
  );

  const navigateToLogin = useCallback(() => {
    navigate(ROUTER_PATH.login);
  }, [navigate]);

  return (
    <div className={styles['register-page']}>
      <h3 className={styles['register-page__title']}>Sign up</h3>
      <div className={styles['register-page__form']}>
        <Form formMethods={form} onSubmit={onSubmit}>
          <Controller
            control={control}
            name="name"
            render={({field}) => (
              <FormItem<SignUpFormType> name="name" label="Name" required>
                <Input {...field} placeholder="Enter your name" type="text" />
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({field}) => (
              <FormItem<SignUpFormType> name="email" label="Email" required>
                <Input {...field} placeholder="joe@email.com" type="email" />
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({field}) => (
              <FormItem<SignUpFormType>
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

          <div className={styles['register-page__empty']}></div>

          <Button
            type="submit"
            block
            size="large"
            color="danger"
            loading={isLoading}
            disabled={!isValid || isLoading}>
            Sign up
          </Button>

          <div className={styles['register-page__login']}>
            Already have an account?{' '}
            <b onClick={navigateToLogin}>Login here.</b>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
