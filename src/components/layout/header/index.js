import React, { useState, useEffect } from "react";
import logo from "../../../assets/logoblanco.png";

export default function Header() {
  const [isLoggedIn, setLogin] = useState();
  const [user, setUser] = useState(localStorage.getItem("correo"));

  useEffect(() => {
    localStorage.length !== 0 ? setLogin(true) : setLogin(false);
  }, []);

  useEffect(() => {
    if (user !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [user])

  const handleLogout = () => {
    if (localStorage.length > 0) {
      localStorage.clear();
      setLogin(false)
      setUser(null)
      window.location.href = "/"
    }
  }

  return (
    <header>
      <div className="header">
        <div className="container">
          <div className="text-white d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <img className="header-logo" src={logo} alt="Cas-Chile Logo" />
            </a>

            {isLoggedIn ? (
              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                  <a href="#" className="nav-link text-white">
                    {user}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-link text-white"
                    onClick={handleLogout}
                  >
                    Cerrar Sesion
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                  <a href="/" className="nav-link text-white">
                    Iniciar Sesion
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
