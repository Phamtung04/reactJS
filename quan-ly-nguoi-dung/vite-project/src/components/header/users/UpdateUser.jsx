import React, { use, useEffect, useState } from "react";
import { badgeClasses, Box, Button, TextField } from "@mui/material";
import { Form, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import User from "../../../config/User";

const UpdateUser = ({ handleCloseModal, id, reLoadData }) => {
  const [userData, setUserData] = useState({});


  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    age: yup.number().required("Age is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone is required"),
    password: yup.string().min(8,"length min 8").required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await User.getById(id);
        setUserData(response.data);
        if (userData) {
          reset(userData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, reset]);


  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    try {
      const response = await User.updateUser(id, userData);
      console.log(response.data);
      reLoadData();
      handleCloseModal();
    } catch (error) {
      console.error(error);
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
        <h1 className="text-1xl font-bold ml-12">Update user</h1>
        <div>
          <TextField
            label="Username"
            id="outlined-size-small"
            size="small"
            value={userData.username || ""}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })} 
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.username?.message}
          </p>
          <TextField
            label="First Name"
            id="outlined-size-small"
            size="small"
            value={userData.firstName || ""}
            onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.firstName?.message}
          </p>

          <TextField
            label="Last Name"
            id="outlined-size-small"
            size="small"
            value={userData.lastName || ""}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.lastName?.message}
          </p>

          <TextField
            label="password"
            id="outlined-size-small"
            type="password"
            size="small"
            value={userData.password || ""}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.password?.message}
          </p>

          <TextField
            label="Age"
            id="outlined-size-small"
            type="number"
            inputProps={{ min: 1 }}
            size="small"
            defaultValue={1}
            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
          />
          <p className="text-red-500 text-xs ml-5">{errors.age?.message}</p>

          <TextField
            label="email"
            id="outlined-size-small"
            type="email"
            size="small"
            value={userData.email || ""}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <p className="text-red-500 text-xs ml-5">{errors.email?.message}</p>

          <TextField
            label="phone"
            id="outlined-size-small"
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
            value={userData.phone || ""}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
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
            type="submit"
          >
            Update
          </Button>
        </div>
      </Box>
    </>
  );
};

export default UpdateUser;
