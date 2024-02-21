import React from "react";
import { ProductList } from "./ProductList";

export default function Products({ productData }) {
  return (
    <>
      <h1 className="text-center mt-10 text-4xl ">Shop Products</h1>
      <div className="max-w-6xl mx-auto  py-20 ">
        <div className="grid md:grid-cols-4 gap-7 grid-cols-2">
          {productData.map((productObj) => (
            <ProductList productObj={productObj} key={productObj.id} />
          ))}
        </div>
      </div>
    </>
  );
}
