import React from "react";
import {
  FieldValues,
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import FormLabel from "./FormLabel";
import styles from "./FormItem.module.scss";

interface FormItemProps<T extends FieldValues> {
  name?: UseControllerProps<T>["name"] | (string | number)[];
  label?: React.ReactNode;
  required?: boolean;
  children: React.ReactElement;
}

function FormItemWithoutControl<T>({
  children,
  ...props
}: Omit<FormItemProps<T>, "name">) {
  return (
    <div className={styles["form-item"]}>
      {props.label && <FormLabel {...props} />}
      {children}
    </div>
  );
}

function FormItemWithControl<T>({
  name,
  label,
  required,
  children,
}: FormItemProps<T>) {
  const fieldName = Array.isArray(name) ? name.join(".") : name;
  const formContext = useFormContext();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control: formContext.control, name: fieldName });

  return (
    <div className={styles["form-item"]}>
      {label && (
        <FormLabel htmlFor={fieldName} label={label} required={required} />
      )}
      {React.createElement(children.type, {
        ...field,
        ...children.props,
        invalid,
      })}
      {error && <p className={styles["error-message"]}>{error.message}</p>}
    </div>
  );
}

export default function FormItem<T>(props: FormItemProps<T>) {
  return props?.name ? (
    <FormItemWithControl {...props} />
  ) : (
    <FormItemWithoutControl {...props} />
  );
}
