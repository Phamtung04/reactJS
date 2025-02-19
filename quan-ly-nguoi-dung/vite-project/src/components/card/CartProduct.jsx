import React, { useState } from "react";
import {
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CartProduct = ({ img, name, price, quantity }) => {

  return (
    <>
      <CardMedia component="img" height="194" image={img} />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <p className="text-black text-xl">{name}</p>
          <p>Price: {price}</p>
          <p>Quantity: {quantity}</p>
        </Typography>
      </CardContent>
    </>
  );
};

export default CartProduct;
