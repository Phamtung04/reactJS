import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { Form, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import User from "../../../config/User";
import axios from "axios";


const CreateUser = ({ handleCloseModal }) => {
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    age: yup.number().required("Age is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone is required"),
    password: yup.string().required("Password is required"),
  });
  const {register, handleSubmit, formState:{ errors }} = useForm({resolver: yupResolver(schema)});

  


  const handleClose = () => {
    handleCloseModal();
  }

   
  // const onSubmit = (data) => {
  //   // data.preventDefault();
  //   const userData = {
  //     username: data.username,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     age: data.age,
  //     email: data.email,
  //     phone: data.phone,
  //     password: data.password,
  //   }
  //   User.create(userData)
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  //   console.log(data);
  // }
  const onSubmit = (data) => {
    // data.preventDefault();
    const userData = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      email: data.email,
      phone: data.phone,
      password: data.password,
    }
    axios.post('https://67b2f907bc0165def8cf5f10.mockapi.io/api/v1/username', userData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    console.log(data);
  }

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
        <h1 className="text-1xl font-bold ml-12">Create user</h1>
        <div >
          <TextField
            label="Username"
            id="outlined-size-small"
            placeholder="Username"
            size="small"
            {...register("username")}
          />
          <p className="text-red-500 text-xs ml-5">{errors.username?.message}</p>
          <TextField
            label="First Name"
            id="outlined-size-small"
            placeholder="First Name"
            size="small"
            {...register("firstName")}
          />
          <p className="text-red-500 text-xs ml-5">{errors.firstName?.message}</p>

          <TextField
            label="Last Name"
            id="outlined-size-small"
            placeholder="Last Name"
            size="small"
            {...register("lastName")}
          />
          <p className="text-red-500 text-xs ml-5">{errors.lastName?.message}</p>

          <TextField
            label="password"
            id="outlined-size-small"
            placeholder="password"
            type="password"
            size="small"
            {...register("password")}
          />
          <p className="text-red-500 text-xs ml-5">{errors.password?.message}</p>

          <TextField
            label="Age"
            id="outlined-size-small"
            type="number"
            inputProps={{ min: 1 }}
            size="small"
            defaultValue={1}
            {...register("age")}
          />
          <p className="text-red-500 text-xs ml-5">{errors.age?.message}</p>

          <TextField
            label="email"
            id="outlined-size-small"
            placeholder="email"
            type="email"
            size="small"
            {...register("email")}
          />
          <p className="text-red-500 text-xs ml-5">{errors.email?.message}</p>
  
          <TextField
            label="phone"
            id="outlined-size-small"
            placeholder="phone"
            type="number"
            size="small"
            sx={{
              // Ẩn spinner cho Firefox
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
              // Ẩn spinner cho Chrome, Safari, Edge, Opera
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
            }}
            {...register("phone")}
          />
          <p className="text-red-500 text-xs ml-5">{errors.phone?.message}</p>

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
            onClick={handleSubmit(handleClose)}
            type="submit"
          >
            Thêm mới
          </Button>
        </div>
      </Box>
    </>
  );
};

export default CreateUser;
