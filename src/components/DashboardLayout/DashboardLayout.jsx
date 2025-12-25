import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../../Aside/Aside';

const DashboardLayout = () => {
    return (
        <div>
            <div className='flex'>
                <Aside></Aside>
                <div className='flex-1 p-5'>
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;