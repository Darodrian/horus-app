import React, { PureComponent } from 'react';
import Navigation from '../components/Navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { render } from '@testing-library/react';


export default class GraficoDeLinea extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            data3: '',
            datosCajaCantidad: '',
            datosCajaTotal: ''
        }
    }

    componentDidMount() {

        var url = 'http://localhost:5000/api';
        var url2 = 'http://localhost:5000/obtenerCaja';
        var body = { caja: 8 };

        //Obtener el total de todas las cajas
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                this.setState({ data3: data })
                console.log(this.state.data3)
            })
            .catch(error => console.error('Error:', error))

        //Obtener datos de caja en especifico
        fetch(url2, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    datosCajaCantidad: data[0].Cantidad,
                    datosCajaTotal: data[0].Valor_Pagado
                })
                console.log(this.state.datosCajaCantidad)
            })
            .catch(error => console.error('Error:', error))


    }
    render() {
        const data3 = this.state.data3;
        const dcCantidad = this.state.datosCajaCantidad;
        const dcTotal = this.state.datosCajaTotal;

        return (
            <div>
                <Navigation />
                <div className="GraficoTitulo">
                    <h1>Caja Numero: 8</h1>
                    <h1>Cantidad: {dcCantidad} ---- Total: {dcTotal}</h1>
                    <LineChart
                        width={1500}
                        height={800}
                        data={data3}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        className="Grafico"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div>
            </div>
        );
    }
}


