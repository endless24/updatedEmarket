// import { useState } from "react";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartProvider";
import { ProductContext } from "../contexts/ProdProvider";

export default function Header() {
  const { filterProduct, products } = useContext(ProductContext);
  // console.log(filterProduct);
  const {
    cart,
    // setCart,
    totalPrice,
    handleDecrement,
    handleIncrement,
    toggleSidebar,
    isOpen,
    handleDeleteItem,
    handleDelAllCart,
  } = useContext(CartContext);

  //cartlist functions
  const cartList = () => {
    return cart.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      // console.log(product, "d");
      return (
        <div className="flex items-center w-full gap-4 my-4 " key={cartItem.id}>
          {product.soldOut ? (
            <div className=" flex-grow flex gap-4 bg-gray-700">
              <div className="w-20 h-20 ">
                <img
                  src={product.img}
                  alt=""
                  className={`rounded-md opacity-35`}
                />
              </div>
              <div>
                <p>{product.name}</p>
                <p className="mt-5">SOLD OUT</p>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex gap-4 ">
              <div className="w-20 h-20 ">
                <img src={product.img} alt="" className="rounded-md" />
              </div>
              <div>
                <p>{product.name}</p>
                <p className="my-1">${product?.price}</p>
                <button
                  className="bg-gray-400 px-2 text-gray-200 "
                  onClick={() => handleDecrement(cartItem?.id)}
                >
                  -
                </button>
                <button className="w-8 bg-gray-700 text-center">
                  {cartItem?.quantity}
                </button>
                <button
                  className="bg-gray-400 px-2 text-gray-200"
                  onClick={() => handleIncrement(cartItem.id)}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {product.soldOut ? (
            <div className="col-span-1 text-xl text-red-600 animate-pulse hover:animate-none">
              <ImBin
                className="cursor-pointer "
                onClick={() => handleDeleteItem(cartItem.id)}
              />
            </div>
          ) : (
            <div className="col-span-1 text-red-600  text-xl">
              <ImBin
                className="cursor-pointer "
                onClick={() => handleDeleteItem(cartItem?.id)}
              />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <header className="  border-b-gray-700  border-b py-6 fixed w-full z-50 bg-gray-900 ">
        <div className="grid lg:grid-cols-2 sm:px-4 lg:p-0 grid-cols-1   max-w-6xl mx-auto ">
          <div className="col-span-1 font-mono font-bold ">
            <strong>E-Commerce</strong>
          </div>
          <div className="col-span-1 relative select-none">
            {cart.length > 0 ? (
              <span className=" cursor-pointer " onClick={toggleSidebar}>
                <FaShoppingCart className="float-right clear-both text-lg  animate-bounce hover:animate-none" />
                <span className="absolute -right-4 -top-4 bg-slate-700 px-2 py-1 rounded-full text-xs">
                  {cart.length}
                </span>
              </span>
            ) : (
              <span className=" cursor-pointer ">
                <FaShoppingCart className="float-right clear-both text-lg " />
                <span className="absolute -right-4 -top-4 bg-slate-700 px-2 py-1 rounded-full text-xs">
                  {cart.length}
                </span>
              </span>
            )}
          </div>
        </div>
      </header>
      {/* sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed top-16 right-0 w-72 h-full bg-gray-800 transform z-20 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out`}
        >
          {/* Sidebar content goes here */}
          <div className=" m-4 ">
            <span
              className="cursor-pointer  rounded-full text-2xl font-bold"
              onClick={toggleSidebar}
            >
              {isOpen ? "x" : "->"}
            </span>
          </div>
          <div className="p-4  font-bold ">
            <p className="text-2xl text-center"> Your Cart ({cart.length})</p>

            {/* calling the cart list function */}
            {cartList()}
          </div>
          <hr className="mx-auto max-w-56 " />

          {cart.length > 0 ? (
            <>
              <div className="text-center   py-3 ">
                <button
                  className="mr-6 rounded-lg  py-2 px-3 bg-gray-700 hover:bg-gray-600 hover:text-gray-300 shadow hover:shadow-gray-500 hover:translate-y-1 duration-500"
                  onClick={() => handleDelAllCart()}
                >
                  Delete all
                </button>
                <span className="text-lg ml-6">Total ${totalPrice}</span>
              </div>

              <Link
                to="/chechout"
                className="text-center mx-auto block bg-gray-700 w-32   py-2 hover:bg-gray-600 hover:text-gray-300 shadow hover:shadow-gray-500 hover:translate-y-1 duration-500 mt-8 rounded-lg cursor-pointer"
              >
                Check out
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
