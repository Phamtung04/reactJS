import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import Product from '../../../config/Product';

const UpdateProduct = ({ handleCloseModal, id, reLoadData}) => {
  const [productData, setProductData] = useState({});

 const Schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    price: yup.number().required("Price is required"),
    quantity: yup.number().required("Category is required"),
    thumbnail: yup.string().required("Image is required"),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(Schema),
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Product.getById(id);
        setProductData(response.data);
        if (productData) {
          reset(productData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const dataProduct = {
      title: data.name,
      price: data.price,
      quantity: data.quantity,
      thumbnail: data.thumbnail,
    };
    try {
    const response = await Product.updateProduct(id, dataProduct);
    console.log(response.data);
    reLoadData();
    handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "90%" } }}
        noValidate
        autoComplete="off"
        backgroundColor="white"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.6)"
        width={1 / 2}
        justifySelf="center"
        m={10}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-1xl font-bold ml-12">Update Product</h1>
        <div>
          <TextField
            label="Name product"
            id="outlined-size-small"
            size="small"
            value={productData.title || ""}
            onChange={(e) => setProductData({ ...productData, title: e.target.value })}
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.name?.message}
          </p>
          <TextField
            label="Price"
            id="outlined-size-small"
            placeholder="Price"
            size="small"
            type='number'
            value={productData.price || ""}
            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.price?.message}
          </p>

          <TextField
            label="quantity"
            id="outlined-size-small"
            placeholder="quantity"
            size="small"
            type='number'
            value={productData.quantity || ""}
            onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.quantity?.message}
          </p>

          <TextField
            id="outlined-size-small"
            size="small"
            type='file'
            {...register("thumbnail")}
            accept="image/png, image/jpeg"
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.thumbnail?.message}
          </p>
          
          <Button
            variant="outlined"
            sx={{
              // float: "right",
              fontSize: "15px",
              backgroundColor: "green",
              color: "white",
              "&:focus": { outline: "none" },
              "&:active": { outline: "none" },
              margin: "10px",
            }}
            type="submit"
          >
            Update
          </Button>
        </div>
      </Box>
    </>
  )
}

export default UpdateProduct;