import React from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MainLayout from "./mainLayout";
import Card from "../components/card/card";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <MainLayout>
        <div className="flex gap-4 w-full">
          <Card
            title="Số người dùng"
            value="100"
            icon={<PersonPinIcon className="text-red-500" />}
            className="w-10 h-10 rounded-full"
          />
          <Card
            title="Tổng số đồ đã mua"
            value="100"
            icon={<LocalGroceryStoreIcon className="text-amber-500" />}
            className="w-10 h-10 rounded-full"
          />
          <Card
            title="Tổng số bài viết"
            value="100"
            icon={<LibraryBooksIcon className="text-green-500" />}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default Dashboard;
