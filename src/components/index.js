import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from './helpers/private-route';
import Login from "./layout/login";
import Header from "./layout/header";
import Footer from "./layout/footer";
import GraficoBarras from "./layout/chart";

const App = () => {
  return (
    <>
      <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/cajas/:caja/:year" element={<PrivateRoute/>}>
              <Route path="/cajas/:caja/:year" element={<GraficoBarras />}/>
            </Route>
          </Routes>
        </Router>
      <Footer />
    </>
  );
}

export default App;
