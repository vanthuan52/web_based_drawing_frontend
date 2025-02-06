import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => (
  <button className={styles.button} onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

export default Button;
