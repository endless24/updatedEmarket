import React from "react";
// import { useState, useContext } from "react";
import Header from "../component/header";
import Product from "../component/products";
import { productData } from "../productData";
// import { Outlet } from "react-router-dom";
// import { CartContext } from "../contexts/CartProvider";

const Root = () => {
  // const { handleAddToCart, toggleSidebar } = useContext(CartContext);

  // loader: async() =>({})

  return (
    <>
      <div className="text-gray-400 bg-gray-900 select-none">
        <Header />
        <Product productData={productData} />
      </div>
    </>
  );
};

export default Root;
