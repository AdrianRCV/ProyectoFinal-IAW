'use client';

import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

//conseguir el id_cliente a apartir del token
const decodeToken = (token) => {
  try {
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    if (!decodedPayload.id_cliente) {
      throw new Error("El token no contiene el ID del usuario (id_cliente).");
    }
    return decodedPayload.id_cliente;
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return null;
  }
};

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idCliente, setIdCliente] = useState(null); //para almacenar el id_cliente
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  // Función para verificar el estado de autenticación y obtener el id_cliente
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    console.log("Verificando token:", token);
    setIsLoggedIn(!!token);

    if (token) {
      const idCliente = decodeToken(token); 
      setIdCliente(idCliente); 
    } else {
      setIdCliente(null); // Si no hay token, limpiar el id_cliente
    }
  };

  // Verificar al montar el componente y cada vez que obtenga el foco
  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkAuthStatus();

      window.addEventListener('focus', checkAuthStatus);
      
      const interval = setInterval(checkAuthStatus, 2000);
      
      // Configurar oyentes de eventos personalizados
      window.addEventListener('custom-login', checkAuthStatus);
      window.addEventListener('custom-logout', checkAuthStatus);

      return () => {
        window.removeEventListener('focus', checkAuthStatus);
        window.removeEventListener('custom-login', checkAuthStatus);
        window.removeEventListener('custom-logout', checkAuthStatus);
        clearInterval(interval);
      };
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIdCliente(null); // Limpiar el id_cliente al cerrar sesión
    window.dispatchEvent(new CustomEvent('custom-logout'));
    router.push('/');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  console.log("Estado de autenticación:", isLoggedIn);

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={handleLogoClick}>
        <Image src="/logo.png" alt="Logo" width={100} height={50} />
      </div>

      <nav>
        <ul className={styles.navList}>
          <li className={styles.dropdown}>
            <span 
              className={styles.dropdownTitle} 
              onClick={toggleDropdown}
            >
              Productos
            </span>
            <ul className={`${styles.dropdownMenu} ${dropdownOpen ? styles.visible : ""}`}>
              <li>
                <Link href="/productos/ordenadores">Ordenadores</Link>
              </li>
              <li>
                <Link href="/productos/tablets">Tablets</Link>
              </li>
              <li>
                <Link href="/productos/telefonos">Teléfonos</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/about">Sobre nosotros</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                {/* Enlace dinámico al carrito usando el id_cliente */}
                <Link href={`/carrito/${idCliente}`}>Carrito</Link>
              </li>
              <li>
                <Link href="/admin">Panel de admin</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/registro">Regístrate</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}