import React, { createContext, useState } from "react";
import { productData } from "../productData";
import Products from "../component/products";

export const ProductContext = createContext();

export default function ProdProvider({ children }) {
  const [products, setProducts] = useState(productData);
  const [query, setQuery] = useState("");
  //filtering products thats out of stock
  const filterProduct = products.filter((product) => !product.soldOut);

  // const handleQuery = (e) => {
  //   e.preventDefault();
  //search input query
  const queryProduct = filterProduct.filter((prodata) =>
    prodata.name.toLowerCase().includes(query)
  );
  // console.log(queryProduct);
  // };

  const value = {
    filterProduct,
    products,
    query,
    setQuery,
    // handleQuery,
    queryProduct,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
