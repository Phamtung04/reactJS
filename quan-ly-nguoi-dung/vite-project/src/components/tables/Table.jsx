import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TabletContainr from './tabletContainr';
import { Outlet } from 'react-router';


const Tables = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt:'10px'}}>
      <TabletContainr/>
    </Paper>
  )
}

export default Tables;