import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const IdleChart = () => {
  const [chartType, setChartType] = useState("line");
  const [data, setData] = useState([
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
    { x: 4, y: 8 },
    { x: 5, y: 10 },
  ]);

    const options = {
        chartOptions: {
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
            title: {
                text: "My Chart",
            },
            xAxis: {
                title: {
                    text: "X Axis",
                },
            },
            yAxis: {
                title: {
                    text: "Y Axis",
                },
            },
            series: [
                {
                    data: data,
                },
            ],
            accessibility: {
              enabled: false
            }
        }
    };

  useEffect(() => {
    setInterval(() => {
      setChartType(
        [
          "line",
          "column",
          "bar",
          "pie",
        ][Math.floor(Math.random() * 4)]
      );
    }, 20000);
  }, []);

  return (
    <div className="chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={options.chartOptions}
      />
    </div>
  );
};

export default IdleChart;