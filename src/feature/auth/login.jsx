import { useRef, useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/helpers/loading-spinner";

//const url = "https://apihorus.caschile.cl/auth/login";
const url = "http://192.168.0.8:6060/auth/login";

const Login = () => {
  const userRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.length !== 0 ? setSuccess(true) : setSuccess(false);
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    setError(false);
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
      window.location.href = "/grafico";
    } catch (err) {
      document.getElementById("error").style.color = "red";
      if (!err?.response) {
        setError(true);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setError(true);
        setErrMsg("Invalid Username or Password");
      } else if (err.response?.status === 401) {
        setError(true);
        setErrMsg("Unauthorized");
      } else {
        setError(true);
        setErrMsg("Login Failed. Error code: " + err.response?.status);
      }
      setLoading(false);
    }
  };

  return (
    <div className="login">

      {success ? ( 

        <div style={{textAlign:"center"}}>
          <LoadingSpinner>
            {window.location.href = "/grafico"}
          </LoadingSpinner>
        </div>

        ) : (

        <div className="form">
          <form onSubmit={handleSubmit}>
            <label>
              <h3>Ingresar</h3>
            </label>
            <label>
              <input
                type="text"
                id="username"
                className="form-control"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                placeholder="Usuario"
                ref={userRef}
              />
            </label>
            <label>
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                placeholder="Contraseña"
              />
            </label>

            {loading ? (
              <div>
                <label>
                  <LoadingSpinner />
                </label>
              </div> 
              ) : (
              <></>
              )
            }
            
            <div id="error" className="form-error">
              {error ? (
                <label>
                  {errMsg}
                </label>
                ) : (
                <></>
                )
              }
            </div> 
              
            <div>
              <button type="submit" className="btn btn-light">
                Entrar
              </button>
            </div>
          </form>
        </div>
        )
      }
    </div>
  );
};

export default Login;
