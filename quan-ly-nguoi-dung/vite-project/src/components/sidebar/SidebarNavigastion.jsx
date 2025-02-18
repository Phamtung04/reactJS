import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Link } from "react-router-dom";

const SidebarNavigastion = () => {
  const arry = [
    { name: "Người dùng", icon: <PersonPinIcon />, link: "users" },
    { name: "Đơn hàng", icon: <LocalGroceryStoreIcon />, link: "orders" },
    { name: "Quản lý bài viết", icon: <LibraryBooksIcon />, link: "posts" },
    { name: "Việc cần làm", icon: <InboxIcon />, link: "todo" },
  ];

  return (
    <List>
      {arry.map((text, index) => (
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
          component={Link}
          to={text.link}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              {text.icon}
              {/* {index % 2 === 0 ? <LocalGroceryStoreIcon /> : <LibraryBooksIcon />} */}
            </ListItemIcon>
            <ListItemText
              primary={text.name}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarNavigastion;

