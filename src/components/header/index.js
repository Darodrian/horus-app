import React, { Component } from 'react';
import logo from '../../assets/logoblanco.png';

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            informacionUsuario: ''
        }
    }

    componentDidMount() {
        const correo = localStorage.getItem("correo");
        if (localStorage.getItem("token") != "") {
            this.setState({
                informacionUsuario:
                    <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <a href="#" class="nav-link text-white">
                                {correo}
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link text-white">
                                Cerrar Sesion
                            </a>
                        </li>
                    </ul>
            })
        }else{
            this.setState({
                informacionUsuario:
                    <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <a href="/" class="nav-link text-white">
                                Iniciar Sesion
                            </a>
                        </li>
                    </ul>
            })
        }
    }

    render() {

        const informacionUsuario = this.state.informacionUsuario

        return (
            <header>
                <div class="px-3 py-4 text-white header">
                    <div class="container">
                        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                            <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                                <img class="logo" src={logo} alt="Cas-Chile Logo" />
                            </a>

                            {informacionUsuario}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}