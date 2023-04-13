import React, { useState, useEffect } from "react";
import logo from "../../assets/logoblanco.png";

export default function Header() {
  const [isLoggedIn, setLogin] = useState();
  const [user, setUser] = useState(sessionStorage.getItem("correo"));

  useEffect(() => {
    sessionStorage.length !== 0 ? setLogin(true) : setLogin(false);
  }, []);

  useEffect(() => {
    if (user !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [user])

  const handleLogout = () => {
    if (sessionStorage.length > 0) {
      sessionStorage.clear();
      setLogin(false)
      setUser(null)
      window.location.href = "/";
    }
  }

  return (
    <header>
      <div className="px-3 py-4 text-white header">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              <img className="logo" src={logo} alt="Cas-Chile Logo" />
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
