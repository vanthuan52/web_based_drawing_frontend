import React from 'react';
import styles from './Button.module.scss';

export interface IButtonProps {
  title: string | undefined;
  onClick?: () => void;
  style?: any;
  link?: string;
  full?: boolean;
  size?: 'small' | 'medium' | 'lager' | 'extra';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  bg?: 'danger' | 'primary' | 'secondary';
  classNameTitle?: string;
  icon?: any;
  checked?: boolean;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  block?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  color = 'primary',
  size = 'medium',
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
      ${block ? styles.block : ''} 
      ${loading ? styles.loading : ''} 
      ${disabled ? styles.disabled : ''} 
      ${className || ''}`}
      disabled={disabled || loading}
      {...rest}>
      {loading && <span className={styles.spinner}></span>}
      {children}
    </button>
  );
};

export default Button;
