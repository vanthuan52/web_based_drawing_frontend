import React from 'react';
import {
  SubmitHandler,
  UseFormReturn,
  FormProvider,
  FieldValues,
} from 'react-hook-form';
import styles from './Form.module.scss';

interface FormProps<T extends FieldValues> {
  formMethods: UseFormReturn<T>;
  onSubmit?: SubmitHandler<T>;
  children: React.ReactNode;
}

export default function Form<T extends FieldValues>({
  formMethods,
  onSubmit,
  children,
}: FormProps<T>): React.ReactElement {
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={onSubmit ? formMethods.handleSubmit(onSubmit) : undefined}
        className={styles['form']}>
        {children}
      </form>
    </FormProvider>
  );
}
