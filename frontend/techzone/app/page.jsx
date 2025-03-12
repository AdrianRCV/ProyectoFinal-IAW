'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Usamos el hook useRouter para la navegación
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';

export default function Productos() {
  const [productos, setProductos] = useState([]); 
  const router = useRouter();

  // Función para obtener los productos desde el API
  const fetchProductos = async () => {
    try {
      const res = await fetch('http://localhost:3001/productos/');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  // Llamada a fetchProductos cuando el componente se monta
  useEffect(() => {
    fetchProductos();
  }, []);

  // Función que redirige al usuario a la página dinámica del producto
  const handleSeeMore = (producto) => {
    console.log("Producto seleccionado:", producto); // Imprimir el producto en la consola para depuración
    if (producto && producto.idProducto) { // Cambié id_producto a idProducto
      router.push(`/producto/${producto.idProducto}`); // Redirige usando el idProducto
    } else {
      console.error("Producto sin idProducto:", producto); // En caso de que el producto no tenga idProducto
    }
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
