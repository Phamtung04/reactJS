import React from 'react'
import { useRoutes } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import MainLayout from '../layouts/mainLayout';
import Table from '../components/tables/Table';
import Dashboard from '../layouts/Dashboard';

const Router = () => {
    const element =  useRoutes([
        {
            element: <Dashboard/>,
            children:[
                {
                    path: '/',
                    element: <Table/>
                },
                {
                    path: '/users',
                    element: <Table/>,
                },
                
            ]
        }
    ])
  return element;
}

export default Router