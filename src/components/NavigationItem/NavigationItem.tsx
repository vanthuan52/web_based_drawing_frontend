import React from 'react';
import clsx from 'clsx';
import styles from './NavigationItem.module.scss';

interface NavigationItemProps {
  icon?: React.ReactNode;
  name: string;
  onClick: () => void;
  isActive?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  name,
  onClick,
  isActive,
}) => {
  return (
    <div
      className={clsx(styles['nav-item'], {[styles['active']]: isActive})}
      onClick={onClick}>
      {icon && <span className={styles['nav-item__icon']}>{icon}</span>}
      <span className={styles['nav-item__name']}>{name}</span>
    </div>
  );
};

export default NavigationItem;
