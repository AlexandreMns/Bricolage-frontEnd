import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Componentes/Navbar/Navbar";
import Register from "./Pages/Register/Register";
import UpdateProduct from "./Pages/UpdateProduct/UpdateProduct";
import ProductList from "./Componentes/ProductList/ProductList";
import ProductDetail from "./Componentes/ProductDetails/ProductDetails";
import Profile from "./Pages/Profile/Profile";  
import Login from "./Pages/Login/Login";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import UserList from "./Pages/UserList/UserList";
import ProductForm from "./Componentes/ProductForm/ProductForm";
import "./App.css";
//import Footer from "./Componentes/Footer/Footer"; FOOTER NOT IMPLEMENTED YET

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/resetpassword" element={<ResetPassword />} />~
            <Route path="/products/:id/update" element={<UpdateProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
