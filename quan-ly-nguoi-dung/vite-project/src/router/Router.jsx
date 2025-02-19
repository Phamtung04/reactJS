import React from 'react'
import { useRoutes } from 'react-router-dom';
import TableUser from '../layouts/tables/tableUser/Table';
import Dashboard from '../layouts/Dashboard';
import TableProduct from '../layouts/tables/tableProduct/TableProduct';

const Router = () => {
    const element =  useRoutes([
        {
            element: <Dashboard/>,
            children:[
                {
                    path: '/',
                    element: <TableUser/>
                },
                {
                    path: '/users',
                    element: <TableUser/>,
                },
                {
                    path: '/products',
                    element: <TableProduct/>,
                },
            ]
        }
    ])
  return element;
}

export default Router