import React, { useEffect, useMemo, useState } from "react";
import User from "../../../config/User";
import {
  Box,
  Button,
  Input,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import UpdateUser from "../../../components/header/users/UpdateUser";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TuneIcon from "@mui/icons-material/Tune";
import { useForm } from "react-hook-form";
import StarIcon from "@mui/icons-material/Star";
import CreateUser from "../../../components/header/users/CreateUser";

const columns = [
  { id: "username", label: "Username", minWidth: 170 },
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 70, align: "right" },
  { id: "email", label: "email", minWidth: 170 },
  { id: "phone", label: "phone", minWidth: 170 },
];

function createData(id, username, firstName, lastName, age, email, phone) {
  // const density = population / size;
  return { id, username, firstName, lastName, age, email, phone };
}

const TabletContainer = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [id, setId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (e) => {
    const id = e.currentTarget.dataset.id;
    setId(id);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsOpenCreate(true);
  };

  const handleCloseCreateModal = () => {
    setIsOpenCreate(false);
  };

  const handleSubmitDelete = async (e) => {
    const id = e.currentTarget.dataset.id;
    try {
      const response = await User.deleteUser(id);
      fetchData();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const filterData = useMemo(() => {
    return data.filter(
      (item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.age.toString().includes(searchTerm)
    );
  }, [data, searchTerm]);

  // const handleSearch = (e) => {
  //   const search = e.target.value.toLowerCase();
  //   if (search === "") {
  //     fetchData();
  //   }
  //   const filteredData = data.filter((item) => {
  //     return (
  //       item.username.toLowerCase().includes(search) ||
  //       item.firstName.toLowerCase().includes(search) ||
  //       item.lastName.toLowerCase().includes(search) ||
  //       item.email.toLowerCase().includes(search) ||
  //       item.phone.toLowerCase().includes(search) ||
  //       item.age.toString().includes(search)
  //     );
  //   });
  //   setData(filteredData);
  // }

  const fetchData = async () => {
    try {
      const response = await User.getAll();
      setData(response.data);
      console.log("Data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rows = Array.isArray(data)
    ? data.map((item) =>
        createData(
          item.id,
          item.username,
          item.firstName,
          item.lastName,
          item.age,
          item.email,
          item.phone
        )
      )
    : [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <header className="bg-gray-100">
        <div className=" flex justify-between items-center gap-4 mt-20 mr-10">
          <h1 className="text-1xl font-bold ml-5">User</h1>

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
              onClick={handleOpenCreateModal}
            >
              + Create
            </Button>
            <Modal open={isOpenCreate} onClose={handleCloseCreateModal}>
              <CreateUser
                handleCloseModal={handleCloseCreateModal}
                reLoadData={fetchData}
              />
            </Modal>
          </div>
        </div>
      </header>
      <Box>
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          sx={{ width: "40%", ml: 2, mt: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer sx={{ maxHeight: 400, mt: 2 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.length > 0 ? (
              filterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const uniqueKey = row.id || index;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={uniqueKey}
                      sx={{ "& button": { m: 1 } }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}

                      <Button
                        variant="outlined"
                        sx={{
                          fontSize: "10px",
                          border: "none",
                          "&:focus": { outline: "none" },
                          "&:active": { outline: "none" },
                        }}
                        onClick={handleOpenModal}
                        data-id={row.id}
                      >
                        <TuneIcon />
                      </Button>
                      <Modal
                        sx={{ backgroundColor: "white" }}
                        open={isOpen}
                        onClose={handleCloseModal}
                      >
                        <UpdateUser
                          handleCloseModal={handleCloseModal}
                          id={id}
                          reLoadData={fetchData}
                        />
                      </Modal>
                      <Button
                        variant="outlined"
                        sx={{
                          fontSize: "10px",
                          border: "none",
                          "&:focus": { outline: "none" },
                          "&:active": { outline: "none" },
                        }}
                        onClick={handleSubmitDelete}
                        data-id={row.id}
                      >
                        <DeleteForeverIcon className="text-red-400" />
                      </Button>
                    </TableRow>
                  );
                })
            ) : (
              <p className="text-gray-500 text-center w-full mt-10">
                No products found
              </p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TabletContainer;
