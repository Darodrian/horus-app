import React, { PureComponent } from 'react';
import Navigation from '../components/Navigation';
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';


export default class GraficoCombinado extends PureComponent {

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
        var body = { caja: 4 };

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
                    <h1>Caja Numero: 4</h1>
                    <h1>Cantidad: {dcCantidad} ---- Total: {dcTotal}</h1>
                    <div style={{ width: '100%', height: 300 }}>
                        <ComposedChart
                            width={1500}
                            height={800}
                            data={data3}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                            className="Grafico"
                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="name" scale="band" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                        </ComposedChart>
                    </div>
                </div>
            </div>
        );
    }
}
