import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Componentes/Navbar/Navbar";
import Register from "./Pages/Register/Register";
import UpdateProduct from "./Pages/UpdateProduct/UpdateProduct";
import ProductList from "./Componentes/ProductList/ProductList";
import CategoryList from "./Pages/CategoriaList/CategoriaList";
import ProductDetail from "./Componentes/ProductDetails/ProductDetails";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import VendaList from "./Pages/VendaList/VendaList";
import Wishlist from "./Pages/Wishlist/Wishlist";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import UserList from "./Pages/UserList/UserList";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import ProductForm from "./Componentes/ProductForm/ProductForm";
import CreateCategory from "./Pages/CreateCategory/CreateCategory";
import UpdateCategory from "./Pages/UpdateCategory/UpdateCategory";
import "./App.css";
import AddStock from "./Pages/AddStock/AddStock";
import GetAllStock from "./Pages/GetAllSotck/GetAllStock";
import GetStock from "./Pages/GetStockProduct/GetStockProduct";
import ShoppingCart from "./Pages/Cart/Cart";
import AlertPage from "./Pages/Alerta/Alerta";
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
            <Route path="/categorys" element={<CategoryList />} />
            <Route path="/vendas" element={<VendaList />} />
            <Route path="/category/create" element={<CreateCategory />} />
            <Route path="/category/update" element={<UpdateCategory />} />
            <Route path="/profile/resetpassword" element={<ResetPassword />} />~
            <Route path="/products/:id/update" element={<UpdateProduct />} />
            <Route path="/profile/update/" element={<UpdateProfile />} />
            <Route path="/stock/:productID" element={<GetStock />} />
            <Route path="/stock/all" element={<GetAllStock />} />
            <Route path="/stock/:productId/add" element={<AddStock />} />
            <Route path="/profile/cart" element={<ShoppingCart />} />
            <Route path="/admin/alerts" element={<AlertPage />} />
            <Route path="/profile/wishlist" element={<Wishlist />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
