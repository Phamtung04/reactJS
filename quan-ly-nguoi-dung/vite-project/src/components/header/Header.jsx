import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Modal } from "@mui/material";
import CreateUser from "./users/CreateUser";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-100">
      <div className=" flex justify-between items-center gap-4 mt-30 mr-10 bg-o">
        <h1 className="text-1xl font-bold ml-12">Người dùng</h1>

        <div>
          <StarIcon className="pr-2.5" style={{ fontSize: "40px" }} />
          <Button
            variant="outlined"
            sx={{
              fontSize: "15px",
              backgroundColor: "green",
              color: "white",
              "&:focus": { outline: "none" },
              "&:active": { outline: "none" },
            }}
            onClick={handleOpenModal}
          >
            {/* <Link to={"create"} >+ Create</Link> */}
            + Create
          </Button>
          <Modal open={isOpen} onClose={handleCloseModal}>
            <CreateUser handleCloseModal={handleCloseModal} />
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
