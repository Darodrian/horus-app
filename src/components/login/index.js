import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../auth-provider";
import LoadingSpinner from "./../loading-spinner/index";

const url = "http://192.168.70.139:9090/auth/login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    userRef.current.focus();
    localStorage.length !== 0 ? setSuccess(true) : setSuccess(false);
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
      setAuth({ user, pwd, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
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
        <div className="Welcome">
          <h1>Bienvenido</h1>
          <a href="/mapa">Ir al mapa</a>
        </div>
      ) : (
        <div className="Login">
          <h1>Login</h1>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                className="form-control"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                aria-describedby="help"
                placeholder="Ingresa tu Usuario"
              />
              <p id="help" className="form-text">
                No compartiremos tu email con nadie
              </p>
            </div>
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
            <br />
            <p id="error" className="form-error" ref={errRef}>
              {errMsg}
            </p>
            <button type="submit" className="btn btn-dark">
              Entrar
            </button>
            <div>{loading ? <LoadingSpinner /> : <></>}</div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
