const   config              = require('./dbConfig'),
        sql                 = require('mssql');    

const   getCajas = async() => {
    try{
        let pool = await sql.connect(config);
        let cajas = await pool.request()
        .query(`SELECT 
                pc.Numero_Caja as name,
                SUM(PC.Total_a_Pagar) as uv,
                COUNT(PC.Placa) as pv,
                0 as amt
                
                
                FROM Permisos_de_Circulacion as PC 
                
                WHERE PC.Fecha_Emision BETWEEN '2019/01/01' AND SYSDATETIME() and PC.Numero_Caja > 1 and PC.Numero_Caja < 100
                group by pc.Numero_Caja`)
        return cajas;
    }
    catch(error){
        console.log(error);
    }
}

const obtenerCaja = async(Caja) => {
    try{
        Caja = parseInt(Caja);
        let pool = await sql.connect(config);
        let datosCaja = await pool.request()
        .query(`SELECT COUNT(PC.Placa) as Cantidad, SUM(PC.Total_a_Pagar) as Valor_Pagado FROM Permisos_de_Circulacion as PC 
                WHERE PC.Fecha_Emision BETWEEN '2019/01/01' AND SYSDATETIME()
                AND PC.Numero_Caja = ${Caja}`)
        return datosCaja;
    }
    catch(error){
        console.log(error);
    }
}

const   getCajasTorta = async() => {
    try{
        let pool = await sql.connect(config);
        let cajas = await pool.request()
        .query(`SELECT 
                pc.Numero_Caja as name,
                SUM(PC.Total_a_Pagar) as value
                
                
                FROM Permisos_de_Circulacion as PC 
                
                WHERE PC.Fecha_Emision BETWEEN '2019/01/01' AND SYSDATETIME() and PC.Numero_Caja > 1 and PC.Numero_Caja < 100
                group by pc.Numero_Caja`)
        return cajas;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getCajas,
    obtenerCaja,
    getCajasTorta
}