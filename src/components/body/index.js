import React, { useState } from "react";
import Chart from "../chart";
import Control from "../control";
import IdleChart from "../idle-chart";

const Body = () => {
    const [cajaSelected, setCajaSelected] = useState(1);
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
    const [chartTypeSelected, setChartTypeSelected] = useState("column");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const funcMsg = (msg) => {
        setMsg(msg);
    };

    const funcLoading = (loading) => {
        setLoading(loading);
    };

    return (
        <div className="body">
            <div className="content">
                <Control data={{cajaSelected, setCajaSelected, yearSelected, setYearSelected, setChartTypeSelected}} msg={msg} loading={loading}/>
                <Chart data={{cajaSelected, yearSelected, chartTypeSelected}} msg={funcMsg} loading={funcLoading}/>
            </div>
            <div className="content">
                <div className="controls"></div>
                <div className="chart">
                    <IdleChart/>
                </div>
            </div>
        </div>
    )
};

export default Body;