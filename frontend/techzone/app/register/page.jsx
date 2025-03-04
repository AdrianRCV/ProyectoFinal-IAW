"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      setMessage("Registro exitoso. Redirigiendo...");

      setTimeout(() => {
        window.location.href = "/"; 
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en el registro.");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.registerWrapper}>
        <div className={styles.registerContenedor}>
          <p className={styles.titulo}>Crear cuenta</p>
          <input
            className={styles.formulario}
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.formulario}
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.formulario}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.formulario}
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleRegister} className={styles.boton1}>
            Continuar
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;

