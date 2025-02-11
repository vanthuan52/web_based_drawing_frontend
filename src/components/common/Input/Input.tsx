import React from 'react';
import styles from './Input.module.scss';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, invalid, icon, ...props}, ref) => {
    return (
      <div
        className={`${styles['input-container']} 
        ${props.disabled ? styles['disabled'] : ''} 
        ${props.readOnly ? styles['readonly'] : ''} 
        ${invalid ? styles['invalid'] : ''} 
        ${className || ''}`}>
        {icon && <div className={styles['icon']}>{icon}</div>}
        <input ref={ref} {...props} className={styles['input-field']} />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
