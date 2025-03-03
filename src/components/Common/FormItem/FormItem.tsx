import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';
import clsx from 'clsx';
import FormLabel from '../FormLabel/FormLabel';
import styled from './FormItem.module.scss';

interface FormItemProps<T extends FieldValues> {
  name?: UseControllerProps<T>['name'];
  label?: React.ReactNode;
  required?: boolean;
  children: React.ReactElement;
}

function FormItemWithoutControl<T extends FieldValues>({
  label,
  required,
  children,
}: Omit<FormItemProps<T>, 'name'>) {
  return (
    <div className={clsx(styled['form-item'])}>
      {label && <FormLabel label={label} required={required} />}
      {children}
    </div>
  );
}

function FormItemWithControl<T extends FieldValues>({
  name,
  label,
  required,
  children,
}: FormItemProps<T>) {
  const formContext = useFormContext();
  if (!formContext) {
    throw new Error('FormItem must be used within a FormProvider');
  }

  if (!name) {
    throw new Error("FormItemWithControl requires a 'name' property.");
  }

  const {
    field,
    fieldState: {error},
  } = useController({control: formContext.control, name});

  return (
    <div className={clsx(styled['form-item'])}>
      {label && <FormLabel htmlFor={name} label={label} required={required} />}
      {React.cloneElement(children, {
        ...field,
      })}
      {error && (
        <span className={clsx(styled['error-message'])}>{error.message}</span>
      )}
    </div>
  );
}

export default function FormItem<T extends FieldValues>(
  props: FormItemProps<T>
) {
  return props?.name ? (
    <FormItemWithControl {...props} />
  ) : (
    <FormItemWithoutControl {...props} />
  );
}
