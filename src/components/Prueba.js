import e from 'cors';
import React, { PureComponent } from 'react';



function TraerDatos(e) {
    e.preventDefault()

    var url = 'http://localhost:5000/api';
    var data = { placa: 'AA-1111' };

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

}


function prueba(props) {
    return (
        <div>
            <button onClick={(e) => TraerDatos(e)}>CLICK</button>
        </div>
    );
}

export default prueba;  