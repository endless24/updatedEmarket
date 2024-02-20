import React from "react";
import { Cards } from "./cards";

export default function Product({ handleAddToCart }) {
  return (
    <div className="">
      <h1 className="text-center mt-10 text-4xl ">Shop Products</h1>
      <Cards handleAddToCart={handleAddToCart} />
    </div>
  );
}
