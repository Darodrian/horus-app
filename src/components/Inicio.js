import React, { Component } from 'react';


export default class Inicio extends Component {
    
    constructor(props){
        super();
        this.state = {value: ''};
            
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        window.location.href= "/mapa"
    }

    render() {
        
        return (
            <div className="Login">
                <h1>Login</h1>
                <br /><br />
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Usuario</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresa tu Usuario"/>
                            <small id="emailHelp" class="form-text text-muted">No compartiremos tu email con nadie más</small>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleInputPassword1">Contraseña</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Contraseña"/>
                    </div>
                    <br />
                    <button type="submit" class="btn btn-dark">Submit</button>
                </form>
            </div>

        )
    }
}


