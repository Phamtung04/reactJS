import React, { useEffect, useMemo, useState } from "react";
import User from "../../../config/User";
import {
  Box,
  Button,
  Chip,
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
import DeleteModal from "../../../components/delete/DeleteModal";
import { useError } from "../../../context/ErrorContext";
import exportToExcel from "../../../components/exportExcel/exportToExcel";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);

  const { showError, showSuccess } = useError();

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

  const handleDelete = (user) => {
    setDeleteUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSubmitDelete = async () => {
    try {
      const response = await User.deleteUser(deleteUser?.id);
      fetchData();
      console.log(response);
      showSuccess("Xóa thành công");
    } catch (error) {
      const errerMessage = `Lỗi ${error.response.data.message}`;
      showError(errerMessage);
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
        item.phone.some((phone) => phone.includes(searchTerm)) ||
        item.age.toString().includes(searchTerm)
    );
  }, [data, searchTerm]);

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

  const handleExport = () => {
    const userData = Array.isArray(data) ? data : [data];

    const formattedData = userData.map((user) => ({
      ...user,
      phone: Array.isArray(user.phone) ? user.phone.join(", ") : user.phone,
    }));

    exportToExcel(formattedData, "User");
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
                        let value = row[column.id];

                        if (column.id === "phone" && Array.isArray(value)) {
                          value = value.map((phone, idx) => (
                            <Chip
                              key={idx}
                              label={phone}
                              sx={{ ml: 0.5 }}
                              color={idx % 2 === 0 ? "primary" : "secondary"}
                            />
                          ));
                        }

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
                      <Button
                        variant="outlined"
                        sx={{
                          fontSize: "10px",
                          border: "none",
                          "&:focus": { outline: "none" },
                          "&:active": { outline: "none" },
                        }}
                        onClick={() => handleDelete(row)}
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

            <Modal open={isOpen} onClose={handleCloseModal}>
              <UpdateUser
                handleCloseModal={handleCloseModal}
                id={id}
                reLoadData={fetchData}
              />
            </Modal>

            <DeleteModal
              open={isDeleteModalOpen}
              onClose={handleCloseDeleteModal}
              onDelete={handleSubmitDelete}
              id={deleteUser?.id}
              name={`user ${deleteUser?.username}`}
            />
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

      <Button variant="contained" color="primary" onClick={handleExport} className="float-right mr-5 mt-5">
        Xuất Excel
      </Button>
    </>
  );
};

export default TabletContainer;
