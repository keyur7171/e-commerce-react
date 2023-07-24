import React, { useState } from "react";
import { ProductData } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState(ProductData);
  const cartItems = useSelector((store) => store.cart.items);

  const isItemInCart = (item) => {
    return cartItems.some((cartItem) => cartItem.prodID === item.prodID);
  };

  const handleAddToCart = (item) => {
    const payload = { ...item, count: 1, amount: item.price };
    dispatch(addItem(payload));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold py-5">Product List</h1>
      <table className="w-full border text-left border-collapse">
        <thead>
          <tr>
            <th className="px-3 py-1 border">Name</th>
            <th className="px-3 py-1 border">Price</th>
            <th className="px-3 py-1 border">Description</th>
            <th className="px-3 py-1 border">Cart</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((item) => {
            const isAddedToCart = isItemInCart(item);
            return (
              <tr key={item.prodID}>
                <td className="px-3 py-1 border relative">
                  {item.name}{" "}
                  {item.quantity < 5 && (
                    <span className="leading-none absolute top-0 right-0 bg-orange-400 text-white p-2 text-xs">
                      Few items left
                    </span>
                  )}
                </td>
                <td className="px-3 py-1 border">{item.price}</td>
                <td className="px-3 py-1 border">{item.description}</td>
                <td className="px-3 py-1 border">
                  <button
                    className={`bg-slate-500 p-2 text-white text-xs ${
                      isAddedToCart ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleAddToCart(item)}
                    type="button"
                    disabled={isAddedToCart}
                  >
                    {isAddedToCart ? "Added to cart" : "Add to cart"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
