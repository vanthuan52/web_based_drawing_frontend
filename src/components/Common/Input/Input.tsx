import React from 'react';
import styles from './Input.module.scss';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  noPadding?: boolean;
  noBorder?: boolean;
  label?: string;
  invalid?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {className, width, height, invalid, noPadding, noBorder, icon, ...props},
    ref
  ) => {
    return (
      <div
        className={`${styles['input-container']} 
        ${props.disabled ? styles['disabled'] : ''} 
        ${props.readOnly ? styles['readonly'] : ''} 
        ${noPadding ? styles['no-padding'] : ''}
        ${noBorder ? styles['no-border'] : ''}
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
