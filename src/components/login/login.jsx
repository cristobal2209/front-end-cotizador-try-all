import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    // Aquí puedes realizar la lógica de autenticación, como enviar una solicitud a un servidor API

    // Simulamos una autenticación exitosa después de 1 segundo
    setTimeout(function () {
      setLoggedIn(true);
    }, 1000);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Bienvenido, {username}!</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <label>
            Nombre de usuario:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      )}
    </div>
  );
}

export default Login;
