'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';
import SearchBar from './componentes/SearchBar'; 

export default function Productos() {
  const [productos, setProductos] = useState([]); // Todos los productos
  const [filteredProductos, setFilteredProductos] = useState([]); // Productos filtrados
  const router = useRouter();

  // Cargar todos los productos al inicio
  const fetchProductos = async () => {
    try {
      const res = await fetch('http://localhost:3001/productos/');
      const data = await res.json();
      setProductos(data);
      setFilteredProductos(data); // mostrar todos los productos
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  //búsqueda
  const handleSearch = async (query) => {
    if (query) {
      try {
        const res = await fetch(`http://localhost:3001/productos/search?q=${query}`);
        const data = await res.json();
        setFilteredProductos(data); //actualiza con los productos filtrados insertados en el buscador
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    } else {
      setFilteredProductos(productos); // en caso de que no haya nada en el buscador muestra todos los productos
    }
  };

  const handleSeeMore = (producto) => {
    console.log("Producto seleccionado:", producto);
    if (producto && producto.idProducto) {
      router.push(`/producto/${producto.idProducto}`);
    } else {
      console.error("Producto sin idProducto:", producto);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {filteredProductos.length > 0 ? (
        <div className={styles.cardsContainer}>
          {filteredProductos.map((producto, index) => (
            <div className={styles.postCard} key={index}>
              <h5 className={styles.TituProducto}>{producto.nombre_producto}</h5>
              <img
                src={producto.imagen}
                alt={producto.nombre_producto}
                className={styles.productImage}
              />
              <div className={styles.cardBody}>
                <Button variant="primary" onClick={() => handleSeeMore(producto)} className={styles.MasInfo}>
                  Mas Información
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
}