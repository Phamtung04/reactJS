import React, { useEffect } from "react";
import { Autocomplete, Box, Button, Chip, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../../../config/User";
import { useError } from "../../../context/ErrorContext";

const UpdateUser = ({ handleCloseModal, id, reLoadData }) => {
  const {showError, showSuccess} = useError();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    age: yup.number().required("Age is required"),
    email: yup.string().email().required("Email is required"),
    // phone: yup.string().required("Phone is required"),
    phone: yup
      .array()
      .of(
        yup
          .string()
          .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
          .required("Số điện thoại không được để trống")
      )
      .min(1, "Phải nhập ít nhất một số điện thoại"),
    password: yup
      .string()
      .min(8, "Length min 8")
      .required("Password is required"),
  });

  const {
    setError,
    control,
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
      showSuccess("Cập nhật thành công");
      reLoadData();
      handleCloseModal();
    },
    onError: (error) => {
      showError("Cập nhật thất bại");
      console.error("Lỗi cập nhật:", error.response?.data || error.message);
      setError("server", { message: "Cập nhật thất bại, vui lòng thử lại." });
    },
  });

  const onSubmit = (data) => {
    const phones = data.phone.map((phone) => phone);
    const updatedData = { ...data, phone: phones };
    console.log(data);
    updateUserMutation.mutate(updatedData);
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
          {/* <TextField
            label="Phone"
            type="number"
            size="small"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          /> */}

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              console.log("Field value:", field.value),
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={field.value || []}
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
