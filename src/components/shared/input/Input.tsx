import React from "react";
import styles from "./Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, invalid, icon, ...rest } = props;

  return (
    <div
      className={`${styles["input-container"]} 
      ${rest.disabled ? styles["disabled"] : ""} 
      ${rest.readOnly ? styles["read-only"] : ""} 
      ${invalid ? styles["invalid"] : ""} 
      ${className || ""}`}
    >
      {icon && <div className={styles["icon"]}>{icon}</div>}
      <input ref={ref} {...rest} className={styles["input-field"]} />
    </div>
  );
});

export default Input;
