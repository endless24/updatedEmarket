import React from "react";
import { ProductList } from "./ProductList";
import { useContext } from "react";
// import { productData } from "../productData";
import { ProductContext } from "../contexts/ProdProvider";

export default function Products() {
  const { queryProduct } = useContext(ProductContext);
  return (
    <>
      <h1 className="text-center mt-28 text-4xl ">Shop Products</h1>

      <div className="max-w-6xl mx-auto  py-20 ">
        <div className="grid lg:grid-cols-4 gap-7 md:grid-cols-2 grid-cols-1">
          {queryProduct.map((productObj) => (
            <ProductList productObj={productObj} key={productObj.id} />
          ))}
        </div>
      </div>
    </>
  );
}
