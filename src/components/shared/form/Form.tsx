import React from "react";
import { SubmitHandler, UseFormReturn, FormProvider } from "react-hook-form";
import styles from "./Form.module.scss";

interface FormProps<T> extends UseFormReturn<T> {
  onSubmit?: SubmitHandler<T>;
  children: React.ReactNode;
}

export default function Form<T>({
  onSubmit,
  children,
  ...methods
}: FormProps<T>): React.ReactElement {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={styles["form"]}
      >
        {children}
      </form>
    </FormProvider>
  );
}
