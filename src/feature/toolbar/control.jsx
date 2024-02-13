import React from "react";
import LoadingSpinner from "../../components/helpers/loading-spinner";
import Switch from "react-switch";

const generateArrayOfCajas = () => {
    const data = [
        {
            codigo: 1,
            name: 'Tránsito'
        },
        {
            codigo: 997,
            name: 'Munimático'
        },
        {
            codigo: 998,
            name: 'ECOM'
        },
        {
            codigo: 999,
            name: 'Vecino Digital'
        }
    ]
    var cajas = [];
    
    for (var i = 0; i <= data.length - 1; i++) {
        cajas.push(data[i]);
    }
    return cajas
};

const generateArrayOfYears = () => {
    var max = new Date().getFullYear();
    var min = 1990;
    var years = [];

    for (var i = max; i >=min; i--) {
        years.push(i);
    }
    return years
};

const Control = (props) => {
    var cajas = generateArrayOfCajas();
    var years = generateArrayOfYears();
    var cells = document.getElementsByClassName('norStatus');

    const handleCajaChange = event => {
        props.data.setCajaSelected(event.target.value);
    }
    const handleYearChange = event => {
        props.data.setYearSelected(event.target.value);
    }
    const handleChartTypeClick = event => {
        props.data.setChartTypeSelected(event.target.id);
        for (var i = 0; i < cells.length; i++) {
            cells[i].disabled = false;
        }
        event.currentTarget.disabled = true;
    }
    const handleSwitchChange = nextChecked => {
        props.data.setCheck(nextChecked);
    }

    return (
        <div className="controls">
            <div className="box">
                Caja:&nbsp;
                <select value={props.data.cajaSelected} onChange={handleCajaChange}>
                    {cajas.map((caja, key) =>{
                        return <option key={key} value={caja.codigo}>{caja.name}</option>
                    })}
                </select>
                &nbsp;Año:&nbsp;
                <select value={props.data.yearSelected} onChange={handleYearChange}>
                    {years.map((year, key) =>{
                        return <option key={key} value={year}>{year}</option>
                    })}
                </select>
                &nbsp;&nbsp;
                <div>
                    <div className="switch">
                        <Switch
                            onChange={handleSwitchChange}
                            checked={props.data.check}
                            height={20}
                            width={48}
                            onColor="#83C4FF"
                            onHandleColor="#428FDE"
                            uncheckedIcon={false}
                            checkedIcon={false}
                        />
                    </div>
                    &nbsp;Modo avanzado&nbsp;
                </div>
            </div>
            <div className="box">
                <input id="column" type="button" onClick={handleChartTypeClick} value="Column Chart" className="norStatus"/>&nbsp;
                <input id="bar" type="button" onClick={handleChartTypeClick} value="Bar Chart" className="norStatus"/>&nbsp;
                <input id="pie" type="button" onClick={handleChartTypeClick} value="Pie Chart" className="norStatus"/>&nbsp;
                <input id="line" type="button" onClick={handleChartTypeClick} value="Line Chart" className="norStatus"/>&nbsp;
                <input id="spline" type="button" onClick={handleChartTypeClick} value="Spline Chart" className="norStatus"/>
            </div>
            {props.loading ? <div className="spinner-box"><LoadingSpinner/></div> : <></>}
            {props.msg === "" ? <></> : <div id="msgControl" className="box">{props.msg}</div>}
        </div>
    )
};

export default Control;