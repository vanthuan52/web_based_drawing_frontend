import React, {FC} from 'react';
import clsx from 'clsx';
import styles from './FormLabel.module.scss';

interface FormLabelProps {
  htmlFor?: string;
  label?: React.ReactNode;
  required?: boolean;
  children?: React.ReactNode;
}

const FormLabel: FC<FormLabelProps> = ({
  htmlFor,
  label,
  required,
  children,
}) => {
  return (
    <label
      className={clsx(styles['form-label'], {[styles['required']]: required})}
      htmlFor={htmlFor}>
      {label}
      {children}
    </label>
  );
};

export default FormLabel;
