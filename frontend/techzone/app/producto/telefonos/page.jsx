'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Button from 'react-bootstrap/Button';
import styles from '../../page.module.css';

export default function Telefonos() {
  const [productos, setProductos] = useState([]); 
  const router = useRouter();

  const fetchProductos = async () => {
    try {
      const res = await fetch('http://localhost:3001/productos/');
      const data = await res.json();
      const telefonos = data.filter(producto => producto.categoria.toLowerCase() === 'telefonos');
      setProductos(telefonos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSeeMore = (producto) => {
    if (producto && producto.idProducto) { 
      router.push(`/producto/${producto.idProducto}`); 
    } else {
      console.error("Producto sin idProducto:", producto); 
    }
  };

  return (
    <div>
      {productos.length > 0 ? (
        <div className={styles.cardsContainer}>
          {productos.map((producto, index) => (
            <div className={styles.postCard} key={index}>
              <h5 className={styles.TituProducto}>{producto.nombre_producto}</h5>
              <img
                src={producto.imagen}
                alt={producto.nombre_producto}
                className={styles.productImage}
              />
              <div className={styles.cardBody}>
                <Button variant="primary" onClick={() => handleSeeMore(producto)} className={styles.MasInfo}>
                  Más Información
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
}
