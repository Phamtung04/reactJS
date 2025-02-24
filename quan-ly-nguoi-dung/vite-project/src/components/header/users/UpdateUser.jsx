import React, { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../../../config/User";

const UpdateUser = ({ handleCloseModal, id, reLoadData }) => {
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    age: yup.number().required("Age is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone is required"),
    password: yup
      .string()
      .min(8, "Length min 8")
      .required("Password is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({ resolver: yupResolver(schema) });

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await User.getById(id);
      console.log(response.data);
      return response.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);


  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: async (data) => await User.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", id]);
      reLoadData();
      handleCloseModal();
    },
  });

  const onSubmit = (data) => {
    updateUserMutation.mutate(data);
  };

  return (
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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TextField
            label="Username"
            size="small"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="First Name"
            size="small"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            size="small"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            label="Password"
            type="password"
            size="small"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Age"
            type="number"
            size="small"
            {...register("age")}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <TextField
            label="Email"
            type="email"
            size="small"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Phone"
            type="number"
            size="small"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={updateUserMutation.isLoading}
          >
            {updateUserMutation.isLoading ? "Updating..." : "Update"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default UpdateUser;
