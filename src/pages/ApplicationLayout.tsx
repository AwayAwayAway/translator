import React from 'react';
import styles from './ApplicationLayout.module.css';
import { Outlet } from 'react-router-dom';
import TopNav from '../shared/components/TopNav';
import { useAppSelector } from '../app/hooks';

const ApplicationLayout: React.FC = () => {
  const isLightMode = useAppSelector((state) => state.style.isLightMode);

  return (
    <div className={styles.wrapper} id={isLightMode ? '' : 'dark-item'}>
      <TopNav />
      <Outlet />
    </div>
  );
};

export default ApplicationLayout;
