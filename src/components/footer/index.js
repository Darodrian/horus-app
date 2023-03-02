import React, { Component } from "react";
import logo from "../../assets/logoblanco.png";

export default class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark text-center text-white footer">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <img className="logo" src={logo} alt="Cas-Chile Logo" />
          </section>
        </div>
        <hr />
        <div className="text-center p-3 pb-4">
          © 2023 Copyright: Cas-Chile S.A de I.
        </div>
      </footer>
    );
  }
}
