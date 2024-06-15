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
import ProductList from "./Pages/ProductList/ProductList";
import CategoryList from "./Pages/CategoriaList/CategoriaList";
import ProductDetail from "./Componentes/ProductDetails/ProductDetails";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import VendaList from "./Pages/VendaList/VendaList";
import Wishlist from "./Pages/Wishlist/Wishlist";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import UserList from "./Componentes//UserList/UserList";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import ProductForm from "./Pages/ProductForm/ProductForm";
import CreateCategory from "./Pages/CreateCategory/CreateCategory";
import UpdateCategory from "./Pages/UpdateCategory/UpdateCategory";
import "./App.css";
import AddStock from "./Pages/AddStock/AddStock";
import GetAllStock from "./Pages/GetAllSotck/GetAllStock";
import GetStock from "./Pages/GetStockProduct/GetStockProduct";
import ShoppingCart from "./Pages/Cart/Cart";
import AlertPage from "./Pages/Alerta/Alerta";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
//import Footer from "./Componentes/Footer/Footer"; FOOTER NOT IMPLEMENTED YET

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/products" element={<ProductList />} /> //done 
            <Route path="/products/create" element={<ProductForm />} /> //done
            <Route path="/products/:id" element={<ProductDetail />} />  //done
            <Route path="/profile" element={<Profile />} /> //done
            <Route path="/register" element={<Register />} /> //done
            <Route path="/login" element={<Login />} /> //done
            <Route path="/users" element={<UserList />} /> //done
            <Route path="/categorys" element={<CategoryList />} /> //done
            <Route path="/vendas" element={<VendaList />} /> 
            <Route path="/category/create" element={<CreateCategory />} /> //done
            <Route path="/category/update" element={<UpdateCategory />} /> //done
            <Route path="/profile/resetpassword" element={<ResetPassword />} /> //done
            <Route path="/products/:id/update" element={<UpdateProduct />} /> //done
            <Route path="/profile/update/" element={<UpdateProfile />} /> //done
            <Route path="/stock/:productID" element={<GetStock />} /> //done
            <Route path="/stock/all" element={<GetAllStock />} /> //done
            <Route path="/stock/:productId/add" element={<AddStock />} /> //done
            <Route path="/profile/cart" element={<ShoppingCart />} /> //done
            <Route path="/admin/alerts" element={<AlertPage />} /> /done
            <Route path="/profile/wishlist" element={<Wishlist />} /> //done
            <Route path="/home" element={<Home />} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} /> //done
            <Route path="*" element={<Navigate to="/home" />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
