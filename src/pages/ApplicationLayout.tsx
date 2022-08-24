import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../shared/components/TopNav';

const ApplicationLayout: React.FC = () => {
  return (
    <>
      <TopNav />
      <Outlet />
    </>
  );
};

export default ApplicationLayout;
