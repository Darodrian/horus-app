import React, { Component } from 'react';
import logo from '../../assets/logoblanco.png'


export default class Footer extends Component {

    render() {
        return (

            <footer class="bg-dark text-center text-white footer">

                <div class="container p-4 pb-0">
                    <section class="mb-4">
                            <img class="logo" src={logo} alt="Cas-Chile Logo" />
                    </section>
                </div>
                <hr />
                <div class="text-center p-3 pb-4" >
                    © 2023 Copyright: Cas-Chile S.A de I.
                </div>

            </footer>
        )
    }
}               