"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setMessage("");
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      setMessage("Login exitoso. Redirigiendo...");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      if (error.response) {
        setMessage(error.response?.data?.message || "Error en el login");
      } else if (error.request) {
        setMessage("Error de red o el servidor no responde.");
      } else {
        setMessage("Error inesperado: " + error.message);
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.registerWrapper}>
        <div className={styles.registerContenedor}>
          <p className={styles.titulo}>Iniciar Sesión</p>
          <input
            className={styles.formulario}
            type="email"
            placeholder="Correo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.formulario}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className={styles.boton1}>
            Entrar
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

