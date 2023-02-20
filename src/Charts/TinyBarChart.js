import { color } from 'd3';
import React, { PureComponent } from 'react';
import Navigation from '../components/Navigation';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default class TinyBarChart extends PureComponent {

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
    var body = { caja: 6 };

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
        <div className='GraficoTitulo'>
          <h1>Caja Numero: 6</h1>
          <h1>Cantidad: {dcCantidad} ---- Total: {dcTotal}</h1>
          <BarChart width={1500} height={800} data={data3} className="Grafico">

            <XAxis dataKey="name" stroke="#000000" />
            <YAxis stroke='#000000' />
            <Tooltip wrapperStyle={{ backgroundColor: '#000000' }} />
            <Legend />
            <Bar dataKey="uv" fill="#2ccfd4" barSize={50} wrapperStyle={{ border: '10px solid #000000' }} />
          </BarChart>

        </div>
      </div>
    );
  }
}

