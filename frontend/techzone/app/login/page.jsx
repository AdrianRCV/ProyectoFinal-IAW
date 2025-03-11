"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Login = () => {
  const [username, setUsername] = useState(""); // Cambiado de email a username
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin"); // Redirigir si ya está autenticado
    }
  }, [router]);

  const handleLogin = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username, // Ahora enviamos "username" en lugar de "email"
        password,
      });

      if (response.data?.access_token) {
        localStorage.setItem("token", response.data.access_token);
        setMessage("Login exitoso. Redirigiendo...");
        setTimeout(() => {
          router.push("/admin"); // Redirigir a la página de administración
        }, 1000);
      } else {
        setMessage("Error: No se recibió el token de autenticación.");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response?.data?.message || "Error en el login");
      } else if (error.request) {
        setMessage("Error de red o el servidor no responde.");
      } else {
        setMessage("Error inesperado: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.registerWrapper}>
        <div className={styles.registerContenedor}>
          <p className={styles.titulo}>Iniciar Sesión</p>
          <input
            className={styles.formulario}
            type="text"
            placeholder="Usuario"
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
          <button
            onClick={handleLogin}
            className={styles.boton1}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;




