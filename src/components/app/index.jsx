import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import PrivateRoute from "../helpers/private-route";
import AuthVerify from "../helpers/auth-verify";

import Header from "../layout/header";
import Body from "../layout/body";
import Footer from "../layout/footer";

import Login from "../../feature/auth/login";

const App = () => {
  const logOut = () =>{
    localStorage.clear();
  }
  return (
    <>
      <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/grafico" element={<PrivateRoute/>}>
              <Route path="/grafico" element={<Body/>}/>
            </Route>
          </Routes>
          <AuthVerify logOut={logOut}/>
        </Router>
      <Footer />
    </>
  );
}

export default App;
