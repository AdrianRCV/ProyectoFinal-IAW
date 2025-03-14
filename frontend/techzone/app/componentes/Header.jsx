'use client';

import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  // Función para verificar el estado de autenticación
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    console.log("Verificando token:", token);
    setIsLoggedIn(!!token);
  };

  // Verificar al montar el componente y cada vez que obtenga el foco
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar inmediatamente
      checkAuthStatus();
      
      // Verificar cada vez que la ventana obtiene el foco
      window.addEventListener('focus', checkAuthStatus);
      
      // Verificar con un intervalo (como respaldo)
      const interval = setInterval(checkAuthStatus, 2000);
      
      // Configurar oyentes de eventos personalizados
      window.addEventListener('custom-login', checkAuthStatus);
      window.addEventListener('custom-logout', checkAuthStatus);
      
      // Limpiar
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
                <Link href="/carrito">Carrito</Link>
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
