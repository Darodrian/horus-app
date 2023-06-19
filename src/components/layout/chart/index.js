import { Component } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
};

class GraficoBarras extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caja: '', year: '',
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        chart: {
            type: 'column',
            borderRadius: 20,
            borderColor: 'darkgray',
            borderWidth: 1
          },
        title: {
          text: 'Registro de ventas total'
        },
        subtitle: {
          text: 'Desde Enero a Marzo'
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
          pointFormat: '<tr><td style="padding:0">$ </td>' +
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
      
        }],
        accessibility: {
          enabled: false
        }
      },
      hoverData: null
    }
  }

  componentDidMount(){
    const caja = this.props.params.caja;
    const year = this.props.params.year;
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    }

    //var url = 'https://apihorus.caschile.cl/cajas/' + caja + '/' + year;
    var url = 'http://192.168.0.6:6060/cajas/' + caja + '/' + year;

    //Obtener el total de todas las cajas
    axios.get(url, config)
    .then((response) => {
      this.setState({
        chartOptions: {
          title:{
            text: "Registro total de ventas de la caja N° " + caja
          },
          series: [{
            name: response.data[0].name,
            data: response.data[0].data
          }]
        }
      })
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  setHoverData = (e) => {
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }

  render() {
    const { chartOptions, hoverData } = this.state;

    return (
      <div className="content">
        <div className="chart">
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </div>
        <div className="control"></div>
      </div>
    )
  }
};

const HOCGraficoBarras = withRouter(GraficoBarras);

export default HOCGraficoBarras;