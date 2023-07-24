import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem("isLogin");
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="p-4 bg-slate-200 shadow-sm">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/">
          <img className="h-10" src="/logo192.png" alt="logo" />
        </Link>
        <ul className="flex items-center space-x-10">
          {isLogin && (
            <li className="font-medium text-xl">
              <Link to="/">Home</Link>
            </li>
          )}
          {isLogin && (
            <li className="relative">
              <Link to="/cart">
                <img className="h-5" src="/shopping-cart.png" alt="cart" />
                <span className="absolute -top-1/2 -right-1/2">
                  {cartItems.length}
                </span>
              </Link>
            </li>
          )}
          
          <li>
            {!isLogin ? (
              <Link className="font-medium text-xl" to="/login">login</Link>
            ) : (
              <>
              {user.email && <div className="text-xs text-center">{user.email}</div>}
              <div onClick={handleLogout} className="text-center text-xs text-red-500">Logout</div>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
