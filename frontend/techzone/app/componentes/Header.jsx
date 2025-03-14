'use client';

import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const updateLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", updateLoginStatus);
    window.addEventListener("login", updateLoginStatus);
    window.addEventListener("logout", updateLoginStatus);

    updateLoginStatus();
    setIsLoading(false);

    return () => {
      window.removeEventListener("storage", updateLoginStatus);
      window.removeEventListener("login", updateLoginStatus);
      window.removeEventListener("logout", updateLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('logout'));
    router.push('/');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={handleLogoClick}>
        <Image src="/logo.png" alt="Logo" width={100} height={50} />
      </div>

      <nav>
        <ul className={styles.navList}>
          <li className={styles.dropdown}>
            <span className={styles.dropdownTitle}>Productos</span>
            <ul className={`${styles.dropdownMenu} ${isLoading ? styles.visible : ""}`}>
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