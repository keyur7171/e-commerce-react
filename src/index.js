import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import Header from "./component/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProceedToPay from "./pages/ProceedToPay";
import PageNotFound from "./pages/PageNotFound";
import Cart from "./pages/Cart";
import store from "./redux/appStore";
import { ProtectedRoute } from "./component/ProtectedRoute";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}></Route>
        <Route exact path="/thanks" element={<ProtectedRoute><ProceedToPay /></ProtectedRoute>}></Route>
        <Route exact path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
    </PersistGate>
  </Provider>
);
