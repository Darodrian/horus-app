import React, { useState, useEffect } from "react";
import logo from "../../assets/logoblanco.png";

const Header = () => {
  const [isLoggedIn, setLogin] = useState();
  const [user, setUser] = useState(localStorage.getItem("correo"));

  useEffect(() => {
    localStorage.length !== 0 ? setLogin(true) : setLogin(false);
  }, []);

  const handleLogout = () => {
    if (localStorage.length > 0) {
      localStorage.clear();
      setLogin(false);
      setUser(null);
      window.location.href = "/";
    }
  }

  return (
    <div className="header">
      <div className="header-content container">
        <a href="/" className="me-lg-auto">
          <img className="header-logo" src={logo} alt="Cas-Chile Logo" />
        </a>

        {isLoggedIn ? (
          <ul className="nav">
            <li>
              <a href="/#" className="nav-link text-white">
                {user}
              </a>
            </li>
            <li>
              <a href="/#" className="nav-link text-white" onClick={handleLogout}>
                Cerrar Sesion
              </a>
            </li>
          </ul>
        ) : (
          <ul className="nav">
            <li>
              <a href="/" className="nav-link text-white">
                Iniciar Sesion
              </a>
            </li>
          </ul>
        )}
        
      </div>
    </div>
  );
};

export default Header;