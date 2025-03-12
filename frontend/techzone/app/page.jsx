'use client'; 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';

export default function Productos() {
  const [productos, setProductos] = useState([]); 
  const [showModal, setShowModal] = useState(false); 
  const router = useRouter();

  const fetchProductos = async () => {
    try {
      const res = await fetch('http://localhost:3001/productos/');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSeeMore = (producto) => {
    // Redirige a la ruta dinámica para el producto seleccionado
    router.push(`/producto/${producto.id}`);
  };

  return (
    <div>
      {productos.length > 0 ? (
        <div className={styles.cardsContainer}>
          {productos.map((producto, index) => (
            <div className={styles.postCard} key={index}>
              <img
                src={producto.imagen}
                alt={producto.nombre_producto}
                className={styles.productImage}
              />
              <div className={styles.cardBody}>
                <h5 className="card-title">{producto.nombre_producto}</h5>
                <p className="card-text">
                  <strong>Categoría:</strong> {producto.categoria}
                </p>
                <p className="card-text">
                  <strong>Precio:</strong> ${producto.precio}
                </p>
                <Button variant="primary" onClick={() => handleSeeMore(producto)}>
                  ¿Saber más?
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
