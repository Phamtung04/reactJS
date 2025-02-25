import React, { useEffect, useState, useMemo } from "react";
import CartProduct from "../../../components/card/CartProduct";
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import CreateProduct from "../../../components/header/products/CreateProduct";
import Product from "../../../config/Product";
import TuneIcon from "@mui/icons-material/Tune";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateProduct from "../../../components/header/products/UpdateProduct";
import DeleteModal from "../../../components/delete/DeleteModal";
import { useError } from "../../../context/ErrorContext";

const TableProduct = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const { showError, showSuccess } = useError();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Product.getAll();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price.toString().includes(searchTerm)
    );
  }, [data, searchTerm]);

  const handleOpenModal = (e) => {
    const id = e.currentTarget.dataset.id;
    setId(id);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDelete = (product) => {
    setDeleteProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSubmitDelete = async (e) => {
    try {
      await Product.deleteProduct(deleteProduct?.id);
      fetchData();
      showSuccess("Xóa thành công");
    } catch (error) {
      const errerMessage = `Lỗi ${error.response.data.message}`;
      showError(errerMessage);
      console.log(error);
    }
  };

  const handleOpenCreateModal = () => {
    setIsOpenCreate(true);
  };

  const handleCloseCreateModal = () => {
    setIsOpenCreate(false);
  };

  return (
    <>
      <header className="bg-gray-100">
        <div className="flex justify-between items-center gap-4 mt-15 mr-10">
          <h1 className="text-1xl font-bold ml-5">Products</h1>
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
        </div>
      </header>

      <Box>
        <TextField
          id="standard-search"
          label="Search product"
          type="search"
          variant="standard"
          sx={{ width: "40%", ml: 2, mt: 1 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Container className="flex flex-wrap mt-4 gap-10 h-140 overflow-y-auto">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 250, mt: 5 }}>
              <CartProduct
                img={
                  // item.thumbnail
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIMgndqDLqHSpzAvgD1CYtWgyI8i83Vh3UWQ&s"
                }
                name={item.title}
                price={item.price}
                quantity={item.quantity}
              />
              <CardActions disableSpacing>
                <IconButton
                  sx={{
                    "&:focus": { outline: "none" },
                    "&:active": { outline: "none" },
                  }}
                  onClick={handleOpenModal}
                  data-id={item.id}
                >
                  <TuneIcon />
                </IconButton>
                <IconButton
                  sx={{
                    "&:focus": { outline: "none" },
                    "&:active": { outline: "none" },
                  }}
                  onClick={() => {
                    handleDelete(item);
                  }}
                  data-id={item.id}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full mt-10">
            No products found
          </p>
        )}
      </Container>

      <Modal open={isOpenCreate} onClose={handleCloseCreateModal}>
        <CreateProduct
          handleCloseModal={handleCloseCreateModal}
          reLoadData={fetchData}
        />
      </Modal>

      <Modal
        open={isOpen}
        onClose={handleCloseModal}
      >
        <UpdateProduct
          handleCloseModal={handleCloseModal}
          id={id}
          reLoadData={fetchData}
        />
      </Modal>

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleSubmitDelete}
        id={deleteProduct?.id}
        name={`product ${deleteProduct?.title}`}
      />
    </>
  );
};

export default TableProduct;
