import React from "react";
import { Cards } from "./cards";

export default function Product({ handleClick }) {
  return (
    <div className="">
      <h1 className="text-center mt-10 text-4xl ">Shop Products</h1>
      <Cards handleClick={handleClick} />
    </div>
  );
}
