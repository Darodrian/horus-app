import React, { Component } from "react";
import logo from "../../assets/logoblanco.png";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      informacionUsuario: "",
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    if (localStorage.length > 0) {
      localStorage.clear();
      window.location.href = "/";
    }
  }

  componentDidMount() {
    const correo = localStorage.getItem("correo");
    if (localStorage.getItem("token") != "") {
      this.setState({
        informacionUsuario: (
          <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <a href="#" className="nav-link text-white">
                {correo}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="nav-link text-white"
                onClick={this.handleLogout}
              >
                Cerrar Sesion
              </a>
            </li>
          </ul>
        ),
      });
    } else {
      this.setState({
        informacionUsuario: (
          <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <a href="/" className="nav-link text-white">
                Iniciar Sesion
              </a>
            </li>
          </ul>
        ),
      });
    }
  }

  render() {
    const informacionUsuario = this.state.informacionUsuario;

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

              {informacionUsuario}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
