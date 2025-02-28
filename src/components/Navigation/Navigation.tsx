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
} from 'lucide-react';
import styles from './Navigation.module.scss';
import NavigationItem from '@/components/NavigationItem/NavigationItem';

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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className={clsx(styles['navigation'])}>
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
    </nav>
  );
};

export default Navigation;
