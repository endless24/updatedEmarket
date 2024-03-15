// import { useState } from "react";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartProvider";
import { ProductContext } from "../contexts/ProdProvider";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function Header() {
  const { products, query, setQuery, handleQuery } = useContext(ProductContext);
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
    toggleMenu,
    toggleMenubar,
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
        <nav className=" md:flex md:items-center md:justify-between md:px-0 px-4 py-2 max-w-6xl mx-auto ">
          <div className=" font-mono font-bold flex items-center justify-between">
            <span>E-Commerce</span>

            <div className="  md:hidden flex-grow">
              {cart.length > 0 ? (
                <span className=" cursor-pointer " onClick={toggleSidebar}>
                  <FaShoppingCart className=" text-lg float-end relative mr-10" />
                  <span className=" bg-gray-700 absolute top-4 right-[60px] px-2 py-1 float-end rounded-full text-xs">
                    {cart.length}
                  </span>
                </span>
              ) : (
                <span className=" cursor-pointer float-end relative">
                  <FaShoppingCart className=" text-lg " />
                  <span className="bg-gray-700 px-1 absolute -top-4 float-end rounded-full text-xs">
                    {cart.length}
                  </span>
                </span>
              )}
            </div>

            <span onClick={toggleMenubar}>
              {toggleMenu ? (
                <FaX className=" text-xl cursor-pointer md:hidden block" />
              ) : (
                <FaBars className=" text-xl cursor-pointer md:hidden block" />
              )}
            </span>
          </div>

          <div className="  select-none">
            <ul
              className={`md:flex md:items-center z-[-1] md:z-auto md:static  absolute
               bg-gray-900 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 
            md:opacity-100 opacity-0 top[-400px] ${
              toggleMenu
                ? "top-[80px] opacity-100"
                : "-top-[80px]  -opacity-100"
            } transition-all ease-in duration-500 `}
            >
              <li className="mx-4 my-6 md:my-0">
                <Link
                  to="/"
                  className="text-xl hover:text-gray-500 duration-500"
                >
                  Home
                </Link>
              </li>

              <li className="mx-4 my-6 md:my-0">
                <Link
                  to="/contact"
                  className="text-xl hover:text-gray-500 duration-500"
                >
                  Contact
                </Link>
              </li>

              <li className="mx-4 my-6 md:my-0">
                <Link
                  to="/about"
                  className="text-xl hover:text-gray-500 duration-500"
                >
                  About
                </Link>
              </li>

              <div className="mx-4 my-6 md:my-0  ">
                {/* <form className="flex" onSubmit={handleQuery}> */}
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder="Search..."
                  className="bg-gray-400  outline-none border-0 text-gray-700 placeholder-gray-600 px-2 py-1 rounded "
                />
                {/* <button
                    type="submit"
                    className="py-1 px-2 bg-gray-700 rounded-r border-none outline-none"
                  >
                    Search
                  </button> */}
                {/* </form> */}
              </div>

              <div className="col-span-1 relative select-none mx-4 my-6 md:my-0 w-full">
                {cart.length > 0 ? (
                  <span className=" cursor-pointer " onClick={toggleSidebar}>
                    <FaShoppingCart className="float-right clear-both text-lg " />
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
            </ul>
          </div>
        </nav>
      </header>
      {/* sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed top-16 right-0 w-72 h-full bg-gray-900 transform z-20 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out`}
        >
          {/* Sidebar content goes here */}
          <div className=" m-8 ">
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
