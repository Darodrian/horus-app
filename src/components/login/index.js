import { useRef, useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const userRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var body = {
      correo: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    if (user !== "" && pwd !== "") {
      axios
        .post("http://192.168.70.139:9090/auth/login", body)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("correo", response.data.correo);
          setSuccess(true);
          setPwd("");
          document.getElementById("help").innerHTML = "";
          window.location.href = "/mapa";
        })
        .catch((error) => {
          if (error.response.status === 400) {
            console.log("Error 400: Bad Request");
          }
          document.getElementById("help").style.color = "red";
          document.getElementById("help").innerHTML =
            "Usuario o contraseña incorrecto";
        });
    } else if (user === "" || pwd === "") {
      document.getElementById("help").style.color = "red";
      document.getElementById("help").innerHTML = "Debe llenar ambos campos";
    }
  };

  return (
    <>
      {success ? (
        <div>
          <h3>Bienvenido, redirigiendo...</h3>
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
            <br />
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
            <button type="submit" className="btn btn-dark">
              Entrar
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
