import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TabletContainer from "./TabletContainer";
import Card from "../../../components/card/card";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const Tables = () => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: "10px" }}>
      <div className="flex gap-4 w-full" style={{position:"fixed"}} >
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
      <TabletContainer />
    </Paper>
  );
};

export default Tables;
