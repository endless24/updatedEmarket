import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../contexts/CartProvider";

export function ProductList({ productObj }) {
  const { handleAddToCart } = useContext(CartContext);
  return (
    <div
      className="col-span-1 bg-gray-800 p-3 rounded-md shadow drop-shadow-lg transition-all duration-500 hover:shadow-slate-400 "
      key={productObj.id}
    >
      <img src={productObj.img} alt={productObj.name} className="rounded-md " />
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
}
