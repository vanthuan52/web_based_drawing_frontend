import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  block?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  size = "medium",
  block = false,
  loading = false,
  disabled,
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${styles[color]} ${styles[size]} 
      ${block ? styles.block : ""} 
      ${loading ? styles.loading : ""} 
      ${disabled ? styles.disabled : ""} 
      ${className || ""}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className={styles.spinner}></span>}
      {children}
    </button>
  );
};

export default Button;
