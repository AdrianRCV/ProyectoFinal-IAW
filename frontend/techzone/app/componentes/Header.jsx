"use client";

import React, { useState } from 'react';
import styles from "./Header.module.css";
import Link from 'next/link';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Mi Sitio</div>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.dropdown}>
            <button onClick={toggleDropdown} className={styles.dropdownButton}>Productos</button>
            {isDropdownOpen && (
              <ul>
                <li><Link href="/productos/xiaomi">Xiaomi</Link></li>
                <li><Link href="/productos/samsung">Samsung</Link></li>
                <li><Link href="/productos/apple">Apple</Link></li>
              </ul>
            )}
          </li>
          <li><Link href="/about">Sobre nosotros</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/registro">Registrate</Link></li>
        </ul>
      </nav>
    </header>
  );
}
