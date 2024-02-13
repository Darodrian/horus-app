import React, { useState, useEffect } from "react";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Drilldown from 'highcharts/modules/drilldown.js';
import withRouter from "../../components/helpers/with-router";
Drilldown(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: '.'
  }
})

const config = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  }
}

const Chart = (props) =>  {
  const caja = props.data.cajaSelected;
  const year = props.data.yearSelected;
  const chartType = props.data.chartTypeSelected;
  //var url = 'https://apihorus.caschile.cl/cajas/' + caja + '/' + year;
  var url = 'http://192.168.0.8:6060/cajas/' + caja + '/' + year;
  const [options , setOptions] = useState({
    chart: {
      type: chartType,
      borderRadius: 20,
      borderColor: 'darkgray',
      borderWidth: 1,
      events: {
        load() {
          setTimeout(this.reflow.bind(this), 0);
        }
      }
    },
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    title: {
      text: 'Registro de ventas'
    },
    subtitle: {
      text: 'Periodo Enero - Marzo'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      min: 0,
      title: {
        text: '<strong>Monto total ( $ )</strong>'
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
      pie: {
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
      },
      series: {
        showInLegend: false,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#666',
        size: '80%',
        innerSize: '50%'
      }
    },
    series: [{
      name: '',
      colorByPoint: true,
      data: [0,0,0]
    }],
    accessibility: {
      enabled: false
    }
  });

  const cajaName = (codigo) => {
    var name = "";
    if (codigo === 1) {
      name = "Tránsito";
    } else if (codigo === 997) {
      name = "Munimático";
    } else if (codigo === 998) {
      name = "ECOM";
    } else if (codigo === 999) {
      name = "Vecino Digital";
    }
    return name
  }

  const clearChart = () => {
    setOptions({
      title: {
        text: "Registro de ventas caja " + cajaName(caja) + ", año " + year
      },
      series: [{
        name: '',
        data: [0,0,0]
      }]
    });
  }

  const handleRequest = async () => {
    try {
      props.msg("");
      props.loading(true);
      await axios.get(url, config)
      .then((response) => {
        setOptions({
          title:{
            text: "Registro de ventas caja " + cajaName(caja) + ", año " + year
          },
          chart: {
            events: {
              drilldown: async function (e) {
                try {
                  if (!e.seriesOptions) {
                    var chart = this;
                    chart.showLoading('Cargando...');
                    await axios.get(url + '/' + (e.point.x+1), config)
                    .then((response2) => {
                      var dias = [];
                      response2.data.map(({name, data}) => {
                        var dia = [name, data]
                        dias.push(dia)
                      })
                      var item = JSON.parse(
                        '{"'+e.point.name+'": {"name": "'+e.point.name+'", "data": '+JSON.stringify(dias)+' } }'
                      )
                      var series = item[e.point.name];
                      chart.addSeriesAsDrilldown(e.point, series);
                      chart.hideLoading();
                    })
                  }
                } catch (err) {
                  console.log(err);
                }
              }
            }
          },
          series: [{
            data: [
              {name: 'Enero', y: response.data[0].data[0], drilldown: true},
              {name: 'Febrero', y: response.data[0].data[1], drilldown: true},
              {name: 'Marzo', y: response.data[0].data[2], drilldown: true}
            ]
          },{
            type: 'pie',
            data: [
              {
                name: 'Enero', 
                y: response.data[0].data[3],
                dataLabels: {
                  enabled: true,
                  distance: -50,
                  format: '{point.total}',
                  style: {
                      fontSize: '15px'
                  }
                }
              },
              {name: 'Febrero', y: response.data[0].data[4]},
              {name: 'Marzo', y: response.data[0].data[5]}
            ],
            center: [75, 65],
            size: 100,
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span></br>',
              pointFormat: '<b>{point.y}</b> ventas'
            }
          }]
        });
        Highcharts.current?.chart.reflow();
        props.loading(false);
      });
    } catch (err) {
      if (!err?.response) {
        clearChart();
        props.msg("No hay datos.");
      } else if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/"
      } else {
        console.log("Request Failed.");
      }
      props.loading(false);
    }
  }

  const setDynamicChart = (chartType) => {
    setOptions({
      chart: {
        type: chartType
      }
    });
  }

  useEffect(() => {
    handleRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caja, year]);

  useEffect(() => {
    setDynamicChart(chartType);
  }, [chartType])

  return (
    <div className="chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
};

const HOCChart = withRouter(Chart);

export default HOCChart;