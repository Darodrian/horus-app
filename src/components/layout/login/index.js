import { useRef, useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import axios from "axios";
import LoadingSpinner from "./../../helpers/loading-spinner";

//const url = "https://apihorus.caschile.cl/auth/login";
const url = "http://192.168.0.6:6060/auth/login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.length !== 0 ? setSuccess(true) : setSuccess(false);
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        url,
        JSON.stringify({ correo: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.token;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("correo", user);
      setUser("");
      setPwd("");
      setSuccess(true);
      window.location.href = "/cajas/1/2023";
    } catch (err) {
      document.getElementById("error").style.color = "red";
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      setLoading(false);
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? ( 
        <Box textAlign="center">
          <LoadingSpinner>
            {window.location.href = "/cajas/1/2023"}
          </LoadingSpinner>
        </Box>
        ) : (
        <div className="login">
          <Grid container rowSpacing={4} alignItems="center" justifyContent="center" >
            <Grid item xs={12}>
              <Box textAlign="center">
                <div className="login-title" > Login</div>
              </Box>
            </Grid>
            <form onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <Box textAlign="center" lineHeight={3}>
                  <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      ref={userRef}
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      aria-describedby="help"
                      placeholder="Ingresa tu Usuario"
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="center" lineHeight={3}>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      placeholder="Contraseña"
                    />
                  </div>
                </Box>
              </Grid>
              <br />
              <Grid item xs={12}>
                <Box textAlign="center" lineHeight={3}>
                  <p id="error" className="form-error" ref={errRef}>
                    {errMsg}
                  </p>
                  <button type="submit" className="btn btn-dark">
                    Entrar
                  </button>
                  <div>{loading ? <LoadingSpinner /> : <></>}</div>
                </Box>
              </Grid>
            </form>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Login;
