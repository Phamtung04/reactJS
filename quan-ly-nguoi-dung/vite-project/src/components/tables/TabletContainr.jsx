import React, { useEffect, useState } from "react";
import User from "../../config/User";
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
import UpdateUser from "../header/users/UpdateUser";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TuneIcon from "@mui/icons-material/Tune";
import { useForm } from "react-hook-form";

const columns = [
  { id: "username", label: "Username", minWidth: 170 },
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 70, align: "right" },
  { id: "email", label: "email", minWidth: 170 },
  { id: "phone", label: "phone", minWidth: 170 },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const TabletContainer = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const { register, watch } = useForm();


  const handleOpenModal = (e) => {
    const id = e.target.dataset.id;
    setId(id);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmitDelete = async (e) => {
    const id = e.target.dataset.id;
    try {
      const response = await User.deleteUser(id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    try {
      const response = await User.search(searchValue);
      const dataArray = Array.from(response.data.users);
      setData(dataArray);
    } catch (error) {
      console.error(error);
    }
  };
  

//  const searchValue = watch("search");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await User.getAll();
        setData(response.data.users);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Tạo mảng rows từ data đã fetch được
  const rows = Array.isArray(data)
    ? data.map((item) =>
        createData(
          item.id,
          item.username,
          item.lastName,
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
      <Box >
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          sx={{ width: "40%", ml: 2 }}
          {...register("search")}
          onChange={handleSearch}
        />
        {/* {searchValue && <p>Search Value: {searchValue}</p>} */}
      </Box>

      <TableContainer sx={{ maxHeight: 440, mt: 5 }}>
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const uniqueKey = row.id || index; // Sử dụng row.id nếu có, nếu không sử dụng index
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
                      <UpdateUser handleCloseModal={handleCloseModal} id={id} />
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
              })}
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
