import React, { useState } from "react";
import Control from "../../feature/toolbar/control";
import Chart from "../../feature/charts/chart";
import IdleChart from "../../feature/charts/idle-chart";

const Body = () => {
    const [cajaSelected, setCajaSelected] = useState(1);
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
    const [chartTypeSelected, setChartTypeSelected] = useState("column");
    const [check, setCheck] = useState(false)
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
            <Control data={{
                    cajaSelected, 
                    setCajaSelected, 
                    yearSelected, 
                    setYearSelected, 
                    setChartTypeSelected,
                    check,
                    setCheck
                }} msg={msg} loading={loading}/>
            <div className="content">
                <div className="chart-container">
                    {check ? 
                    <>
                        <Chart data={{cajaSelected, yearSelected, chartTypeSelected}} msg={funcMsg} loading={funcLoading}/>
                        <Chart data={{cajaSelected, yearSelected, chartTypeSelected}} msg={funcMsg} loading={funcLoading}/>
                        <Chart data={{cajaSelected, yearSelected, chartTypeSelected}} msg={funcMsg} loading={funcLoading}/>
                        <Chart data={{cajaSelected, yearSelected, chartTypeSelected}} msg={funcMsg} loading={funcLoading}/>
                    </> : <IdleChart/>
                    }
                </div>
            </div>
        </div>
    )
};

export default Body;