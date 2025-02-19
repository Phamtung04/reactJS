import React from "react";
import Card from "../components/card/card";
import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

const Dashboard = () => {
  return (
    <>
      <MainLayout>
        <div className=" mt-15">
         
        </div>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default Dashboard;
