import React, {useState} from 'react';
import clsx from 'clsx';
import {
  Home,
  File,
  Edit,
  View,
  PenTool,
  HelpCircle,
  Settings,
  UserCircle,
} from 'lucide-react';
import styles from './Navigation.module.scss';
import NavigationItem from '@/components/NavigationItem/NavigationItem';
import {RootState, useAppDispatch, useAppSelector} from '@/redux/store';
import Button from '@/components/Common/Button';
import {authActions} from '@/redux/slice/authSlice';

const NAV_ITEMS = [
  {name: 'Home', icon: <Home />, action: () => {}},
  {name: 'File', icon: <File />, action: () => {}},
  {name: 'Edit', icon: <Edit />, action: () => {}},
  {name: 'View', icon: <View />, action: () => {}},
  {name: 'Tool', icon: <PenTool />, action: () => {}},
  {name: 'Help', icon: <HelpCircle />, action: () => {}},
  {name: 'Setting', icon: <Settings />, action: () => {}},
];

const Navigation = () => {
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const {isAuthenticated} = useAppSelector((root: RootState) => root.auth);

  return (
    <nav className={clsx(styles['navigation'])}>
      <div className={styles['navigation-items']}>
        {NAV_ITEMS.map((item, index) => (
          <NavigationItem
            key={index}
            icon={item.icon}
            name={item.name}
            onClick={() => {
              setActiveIndex(index);
              item.action();
            }}
            isActive={index === activeIndex}
          />
        ))}
      </div>
      <div className={styles['navigation-auth']}>
        {isAuthenticated ? (
          <div className={styles['navigation-auth__active']}>
            <UserCircle size={22} />
            <span>John Doe</span>
            <Button
              onClick={() => dispatch(authActions.logout())}
              color={'secondary'}>
              Logout
            </Button>
          </div>
        ) : (
          <div className={styles['navigation-auth__inactive']}>Login</div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
