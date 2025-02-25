import { Autocomplete, Box, Button, Chip, TextField } from "@mui/material";
import React from "react";
import { Controller, Form, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import User from "../../../config/User";
import { useError } from "../../../context/ErrorContext";

const CreateUser = ({ handleCloseModal, reLoadData }) => {
  const { showError, showSuccess } = useError();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    age: yup.number().required("Age is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup
      .array()
      .of(
        yup
          .string()
          .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
          .required("Số điện thoại không được để trống")
      )
      .min(1, "Phải nhập ít nhất một số điện thoại"),
    // phone: yup.string().required("Phone is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    setError,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    User.create(data)
      .then((response) => {
        reLoadData();
        handleCloseModal();
        showSuccess("Thêm mới thành công");
        console.log(response.data);
      })
      .catch((error) => {
        showError("Thêm mới thất bại");
        console.error(error);
      });
    console.log(data);
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
        <h1 className="text-1xl font-bold ml-12">Create user</h1>
        <div>
          <TextField
            label="Username"
            id="outlined-size-small"
            placeholder="Username"
            size="small"
            {...register("username")}
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.username?.message}
          </p>
          <TextField
            label="First Name"
            id="outlined-size-small"
            placeholder="First Name"
            size="small"
            {...register("firstName")}
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.firstName?.message}
          </p>

          <TextField
            label="Last Name"
            id="outlined-size-small"
            placeholder="Last Name"
            size="small"
            {...register("lastName")}
          />
          <p className="text-red-500 text-xs ml-5">
            {errors.lastName?.message}
          </p>

          <TextField
            label="password"
            id="outlined-size-small"
            placeholder="password"
            type="password"
            size="small"
            {...register("password")}
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

          {/* <TextField
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
          <p className="text-red-500 text-xs ml-5">{errors.phone?.message}</p> */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={field.value}
                onChange={(_, newValue) => {
                  const validPhones = newValue.filter((phone) =>
                    /^\d{10}$/.test(phone)
                  );

                  if (newValue.some((phone) => !/^\d{10}$/.test(phone))) {
                    setError("phone", {
                      type: "manual",
                      message: "Tất cả số điện thoại phải có 10 chữ số",
                    });
                  }

                  field.onChange(validPhones);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        variant="outlined"
                        label={option}
                        key={key}
                        {...tagProps}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Nhập số điện thoại"
                    placeholder="Nhập số điện thoại (10 chữ số)"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            )}
          />

          {/*  */}

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
            Thêm mới
          </Button>
        </div>
      </Box>
    </>
  );
};

export default CreateUser;
