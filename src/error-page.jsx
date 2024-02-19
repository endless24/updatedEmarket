import { useRouteError } from "react-router-dom";
// import React from "react";

const Errorpage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="text-center mt-80  text-2xl">
      <h1 className="font-bold">Oops!</h1>
      <p className="py-10 text-gray-500">
        Sorry, an unexpected error has occurred 🤔.
      </p>
      <p className="text-gray-400">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Errorpage;
