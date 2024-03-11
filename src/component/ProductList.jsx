import React from "react";
import "../index.css";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../contexts/CartProvider";

export function ProductList({ productObj }) {
  const { handleAddToCart } = useContext(CartContext);

  //product function
  const product = () => {
    return (
      <div
        className="col-span-1  p-3 rounded-md bg-gray-800 shadow drop-shadow-lg hover:translate-y-2 duration-500 hover:shadow-gray-500"
        key={productObj.id}
      >
        <img
          src={productObj.img}
          alt={productObj.name}
          className="rounded-md w-full"
        />
        <div className="py-5 font-bold text-base uppercase">
          {productObj.name}
        </div>

        <div className="flex w-full items-center py-2">
          <div className="flex-grow font-bold">${productObj.price}</div>
          <div className=" flex items-center justify-center rounded-full w-8 h-8 bg-gray-600">
            <FaShoppingCart
              className=" clear-both cursor-pointer"
              onClick={() => handleAddToCart(productObj)}
            />
          </div>
        </div>
      </div>
    );
  };
  //calling the product function here
  return <> {product()}</>;
}
