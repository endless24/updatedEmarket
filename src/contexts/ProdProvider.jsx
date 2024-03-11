import React, { createContext, useState } from "react";
import { productData } from "../productData";

export const ProductContext = createContext();

export default function ProdProvider({ children }) {
  const [products, setProducts] = useState(productData);

  const filterProduct = products.filter((product) => !product.soldOut);

  return (
    <ProductContext.Provider value={{ filterProduct, products }}>
      {children}
    </ProductContext.Provider>
  );
}
