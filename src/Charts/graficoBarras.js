import React, { Component, PureComponent } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useParams } from "react-router-dom";
import axios from "axios";

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}

class GraficoBarras extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      caja: '',
      datosBD1: [645645,403401,201201],
      datosBD2: [410000,200000,600000],
      name1: "2023",
      name2: "2022",
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        chart: {
            type: 'column'
          },
          title: {
            text: 'Registro de ventas total'
          },
          subtitle: {
            text: 'subtitulo'
          },
          xAxis: {
            categories: [
              'Enero',
              'Febrero',
              'Marzo',
            ],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Monto total ( $ )'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">$ </td>' +
              '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            data: [0,0,0]              
        
          }]
      },
      hoverData: null
    };
  }

  componentDidMount(){

    const caja = this.props.params.caja;

    var url = 'http://192.168.70.139:9090/graficos/graficoAnual/';
    

    //Obtener el total de todas las cajas
    axios 
      .get(url)
      .then((response) => console.log(response))


    this.setState({
      chartOptions: {
        title:{
          text: "Registro total de ventas de la caja N° " + caja
        },
        series: [{
          name: this.state.name1,
          data: this.state.datosBD1

        },
        {
          name: this.state.name2,
          data: this.state.datosBD2
        }]
      }
    })
  }

  setHoverData = (e) => {
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }


  render() {
    const { chartOptions, hoverData } = this.state;

    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    )
  }
}


const HOCGraficoBarras = withRouter(GraficoBarras);

export default HOCGraficoBarras;