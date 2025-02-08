import React from "react";
import styles from "./FormLabel.module.scss";

interface FormLabelProps {
  htmlFor?: string;
  label?: React.ReactNode;
  required?: boolean;
}

const FormLabel = ({ htmlFor, label, required }: FormLabelProps) => {
  return (
    <label
      className={`${styles["form-label"]} ${
        required ? styles["required"] : ""
      }`}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
};

export default FormLabel;
