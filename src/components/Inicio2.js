import { useRef, useState, useEffect } from "react";

const Inicio = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user == "admin" && pwd == "12345") {
      console.log(user, pwd);
      setUser("");
      setPwd("");
      setSuccess(true);
      window.location.href = "/mapa";
    } else {
      document.getElementById("help").style.color = "red";
      document.getElementById("help").innerHTML =
        "Usuario o contraseña incorrecta";
    }
  };

  return (
    <>
      {success ? (
        <div className="Login">
          <h3>Bienvenido</h3>
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
                required
              />
              <p id="help" className="form-text">
                No compartiremos tu email con nadie más
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
                required
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

export default Inicio;
