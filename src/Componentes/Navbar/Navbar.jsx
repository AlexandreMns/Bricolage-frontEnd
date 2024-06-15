import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../Services/userService";

import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    getUserProfile()
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  useEffect(() => {
    // Inicializa a navbar do Materialize CSS
    const elemsSidenav = document.querySelectorAll(".sidenav");
    const instancesSidenav = window.M.Sidenav.init(elemsSidenav);

    const elemsDropdown = document.querySelectorAll(".dropdown-trigger");
    const instancesDropdown = window.M.Dropdown.init(elemsDropdown, {
      coverTrigger: false, // Permite o dropdown aparecer fora do elemento
    });

    return () => {
      instancesSidenav.forEach((instance) => instance.destroy());
      instancesDropdown.forEach((instance) => instance.destroy());
    };
  }, []);

  const handleLogout = () => {
    // Remove o token de autenticação do local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    // Redireciona para a página de home
    navigate("/home");
  };

  const isAdmin = localStorage.getItem("userRole") === "Administrador";
  const isUser = localStorage.getItem("userRole") === "Cliente";

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to={`/home`} className="brand-logo">
            XanBrico
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {/* Verifica se é usuário ou administrador */}
            {(isUser || isAdmin) && (
              <li>
                {/* Renderiza a imagem do usuário se userData estiver definido */}
                {userData?.imagem ? (
                  <img
                    src={`http://localhost:3001/uploads/${userData.imagem}`}
                    alt="Imagem do Usuário"
                    className="profile-image"
                    onClick={() => navigate("/profile")}
                  />
                ) : (
                  <i className="material-icons" onClick={() => navigate("/profile")}>account_circle</i>
                )}
              </li>
            )}
            {/* Renderiza o dropdown do usuário se for usuário ou administrador */}
            {(isUser || isAdmin) && (
              <li>
                <a className="dropdown-trigger" href="#" data-target="user-dropdown">
                  User<i className="material-icons right">arrow_drop_down</i>
                </a>
                <ul id="user-dropdown" className="dropdown-content">
                  <li>
                    <Link to={`/profile`}>Profile</Link>
                  </li>
                  <li>
                    <Link to={`/profile/wishlist`}>Wishlist</Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link to={`/users`}>Users</Link>
                    </li>
                  )}
                  {
                    isAdmin && (
                      <li>
                        <Link to={`/admin/alerts`}>Alertas</Link>
                      </li>
                    )
                  }
                  <li className="divider"></li>
                  <li>
                    <a href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link to={`/vendas`}>Vendas</Link>
              </li>
              )}
            <li>
              <Link to={`/products`}>Produtos</Link>
            </li>
            {isAdmin && (
               <li>
               <Link to={`/categorys`}>Categorias</Link>
             </li>
            )}
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            {(isUser || isAdmin) && (
              <li>
                <Link to={`/profile/cart`}>Cart</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to={`/profile`}>Profile</Link>
        </li>
        <li>
          <Link to={`/profile/wishlist`}>Wishlist</Link>
        </li>
        <li>
          <Link to={`/products`}>Produtos</Link>
        </li>
        <li>
          <a href="collapsible.html">Services</a>
        </li>
        {isAdmin && (
          <li>
            <Link to={`/users`}>Users</Link>
          </li>
        )}
        <li>
          <Link to={`/profile/cart`}>Cart</Link>
        </li>
        <li className="divider"></li>
        <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
