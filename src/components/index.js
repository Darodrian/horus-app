import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GraficoBarras from "./chart";
import Inicio from "./login";
import Mapa from "./map";
import Header from "./header";
import Footer from "./footer";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" exact element={<Inicio />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/grafico1/:caja" exact element={<GraficoBarras />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
