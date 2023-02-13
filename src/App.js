import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import TinyBarChart from './Charts/TinyBarChart';
import GraficoCombinado from './Charts/GraficoCombindo';
import GraficoDeTorta from './Charts/PieChart';
import GraficoDeLinea from './Charts/LineChart';
import Inicio from './components/Inicio2';
import Mapa from './components/Mapa';
import Prueba from './components/Prueba';


function App() {
  return (
    
    <Router>
      
    
      <Routes>
        <Route path='/' exact element={<Inicio/>} />
        <Route path='/mapa' element={<Mapa/>}/>
        <Route path='/grafico1' exact element={<GraficoDeTorta/>} />
        <Route path='/grafico2' element={<GraficoDeLinea/>} />
        <Route path='/grafico3' element={<GraficoCombinado/>} />
        <Route path='/grafico4' element={<TinyBarChart/>} />
      </Routes>
      
    </Router>

  );
}

export default App;
