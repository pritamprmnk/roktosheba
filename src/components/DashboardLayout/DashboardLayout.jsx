import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../../Aside/Aside';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <Aside />
        <div className="flex-1 p-4 lg:p-5 mt-14 lg:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
    );
};

export default DashboardLayout;