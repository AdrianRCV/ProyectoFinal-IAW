"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      setMessage("Login exitoso. Redirigiendo...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error en el login."
      );
    }
  };

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setMessage(""); 
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.access_token);

      setMessage("Inicio de sesion exitoso. Redirigiendo...");
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
  const handleRedirect = () => {
    router.push("/register");
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
          <button onClick={handleLogin} className={styles.boton1}>
            Entrar
          </button>
          {message && <p>{message}</p>}
        </div>
      <div className={styles.loginWrapper}>
      <div className={styles.loginContenedor}>
      <p className={styles.titulo}>Iniciar sesión</p>
      <input className={styles.formulario} type="text" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)}/>
      <input className={styles.formulario} type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
      <button className={styles.boton1} onClick={handleLogin}>Continuar</button>
      {message && <div>{message}</div>}
      </div>
      <button className={styles.boton2} onClick={handleRedirect}>Crear cuenta</button>
      </div>
    </div>
  );
};

export default Login;
