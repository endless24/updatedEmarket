// import React from "react";
import { useState, useContext } from "react";
import Header from "./header";
import Product from "./product";
import PaystackIntegration from "./PaystackIntegration";
// import { Outlet } from "react-router-dom";
import { CartContext } from "../contexts/CartProvider";

const Root = () => {
  const { cart, setCart } = useContext(CartContext);
  const [warning, setWarning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [checkout, setChekOut] = useState(true);

  //toggle the side bar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  //function that add to cart when clicked
  const handleClick = (items) => {
    let isAdded = false;
    //checking if the item has been added
    //checking if the clicked item is equal to the id of the product
    cart.forEach((data) => {
      //if the item and id is equal them add to cart
      if (items.id === data.id) {
        isAdded = true;
      }
    });
    //if it has been dont add again
    //with alert messege
    if (isAdded) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    setCart([...cart, items]);
  };
  //function to decrement /increment quantity
  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
  };
  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) }
          : item
      )
    );
  };

  let totalPrice = 0;
  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    totalPrice += element.quantity * element.price;
  }

  // loader: async() =>({})

  return (
    <>
      <div className="text-gray-400 bg-gray-900 select-none">
        <Header
          cart={cart}
          setCart={setCart}
          size={cart.length}
          toggleSidebar={toggleSidebar}
          isOpen={isOpen}
          toggleCheckout={() => {
            setChekOut(!checkout);
            toggleSidebar();
          }}
          checkout={checkout}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          price={totalPrice}
        />
        {/* <Outlet /> */}

        <Product handleClick={handleClick} toggleSidebar={toggleSidebar} />
        {warning && (
          <div className="h-14 w-80 absolute right-0 top-20 z-50 text-center p-5 bg-red-800 font-mono text-md rounded-md">
            Item is already in the cart!
          </div>
        )}
      </div>
    </>
  );
};

export default Root;
