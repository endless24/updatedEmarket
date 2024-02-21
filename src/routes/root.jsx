import React from "react";
// import { useState, useContext } from "react";
import Header from "../component/header";
import Product from "../component/products";
import { productData } from "../productData";

const Root = () => {
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
