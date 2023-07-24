import React from "react";
import { Link } from "react-router-dom";

const ProceedToPay = () => {
  return (
    <div className="text-center">
      <p className="py-10 text-red-500 text-2xl">Thanks</p>
      <Link to="/" className="mt-3 bg-slate-500 text-white px-3 py-2 text-base">
        Continue Shopping
      </Link>
    </div>
  );
};

export default ProceedToPay;
