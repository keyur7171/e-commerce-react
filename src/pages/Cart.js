import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeItem,
  updateItemCount,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = cartItems.reduce(
        (accumulator, item) => accumulator + item.amount,
        0
      );
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [cartItems]);

  const handleCount = (id, updateType) => {
    dispatch(updateItemCount({ id, updateType }));
  };

  const handleProceedToPay =()=>{
    dispatch(clearCart());
    navigate('/thanks')
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold py-5">Cart List</h1>
        <div className="bg-red-500 p-2 text-white text-xs" onClick={() => dispatch(clearCart())}>Clear Cart</div>
      </div>
      <table className="w-full border text-left border-collapse">
        <thead>
          <tr>
            <th className="px-3 py-1 border">Name</th>
            <th className="px-3 py-1 border">Price</th>
            <th className="px-3 py-1 border">Description</th>
            <th className="px-3 py-1 border">Quantity</th>
            <th className="px-3 py-1 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr key={item.prodID}>
                <td className="px-3 py-1 border">{item.name}</td>
                <td className="px-3 py-1 border">{item.price}</td>
                <td className="px-3 py-1 border">{item.description}</td>
                <td className="px-3 py-1 border">
                  <button
                    onClick={() => handleCount(item.prodID, "decrease")}
                    type="button"
                    className="font-bold text-2xl p-2"
                  >
                    -
                  </button>
                  {item.count}
                  <button
                    onClick={() => handleCount(item.prodID, "increase")}
                    type="button"
                    className="font-bold text-2xl p-2"
                  >
                    +
                  </button>
                </td>
                <td className="px-3 py-1 border">
                  <button
                    onClick={() => dispatch(removeItem(item))}
                    type="button"
                    className="bg-red-500 p-2 text-white text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-end mt-4">
        <p className="font-bold text-lg mr-3">Total - {totalAmount}</p>
        <button type="button" onClick={handleProceedToPay} className="bg-slate-500 px-3 py-2 text-white">
          Proceed to pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
