import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  useEffect(() => {
    // Inicializa a navbar do Materialize CSS
    const elems = document.querySelectorAll(".sidenav");
    const instances = window.M.Sidenav.init(elems);
    return () => {
      instances.forEach((instance) => instance.destroy());
    };
  }, []);

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to={`/home`} className="brand-logo">
            Logo
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to={`/profile`}>User</Link>
            </li>
            <li>
              <Link to={`/products`}>Produtos</Link>
            </li>
            <li>
              <a href="collapsible.html">Services</a>
            </li>
            <li>
              <Link to={`/profile/cart`}>Cart</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to={`/profile`}>User</Link>
        </li>
        <li>
          <Link to={`/products`}>Produtos</Link>
        </li>
        <li>
          <a href="collapsible.html">Services</a>
        </li>
        <li>
          <Link to={`/profile/cart`}>Cart</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
