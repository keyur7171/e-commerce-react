import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../utils/constants";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");

  const handleEmail = (event) => {
    const email = event.target.value;
    const validate = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (validate) {
      setEmailInputError("");
      setEmailInput(event.target.value);
    } else {
      setEmailInputError("Please enter valid email");
    }
  };

  const handlePassword = (event) => {
    const password = event.target.value;
    const validate = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (validate.test(password)) {
      setPasswordInputError("");
      setPasswordInput(event.target.value);
    } else {
      setPasswordInputError("Please enter valid password");
    }
  };

  const checkCredentials = (email, password) => {
    for (const user of UserData) {
      if (user.email === email && user.password === password) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (event) => {
    const IsUserValid = checkCredentials(emailInput, passwordInput);
    if (IsUserValid) {
      dispatch(loginUser(emailInput));
      localStorage.setItem("isLogin", true);
      navigate("/");
    } else {
      alert("Invalid email or password.");
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100%_-_72px)]">
      <div className="bg-slate-200 p-5 shadow-sm w-full max-w-md">
        <div className="mb-2">
          <input
            className="px-3 py-2 focus:outline-none w-full"
            type="text"
            placeholder="Enter Email"
            onChange={(event) => handleEmail(event)}
          />
          {emailInputError && (
            <span className="text-red-500 font-light text-xs">
              {emailInputError}
            </span>
          )}
        </div>
        <div className="mb-3">
          <input
            className="px-3 py-2 focus:outline-none w-full"
            type="password"
            placeholder="Enter Password"
            onChange={(event) => handlePassword(event)}
          />
          {passwordInputError && (
            <span className="text-red-500 font-light text-xs">
              {passwordInputError}
            </span>
          )}
        </div>
        <button
          className="w-full bg-slate-500 p-2 text-white font-semibold text-lg"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
