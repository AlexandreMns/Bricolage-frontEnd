import React, { useEffect } from "react";

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
          <a href="#!" className="brand-logo">
            Logo
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="sass.html">Home</a>
            </li>
            <li>
              <a href="badges.html">About</a>
            </li>
            <li>
              <a href="collapsible.html">Services</a>
            </li>
            <li>
              <a href="mobile.html">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">Home</a>
        </li>
        <li>
          <a href="badges.html">About</a>
        </li>
        <li>
          <a href="collapsible.html">Services</a>
        </li>
        <li>
          <a href="mobile.html">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
