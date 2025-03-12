'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

export default function ProductoDetails() {
  const [producto, setProducto] = useState(null);
  const router = useRouter();
  const { id } = router.query;  // Usar `router.query.id` en lugar de `query.id`

  useEffect(() => {
    // Verificar que el id esté presente antes de hacer la llamada a la API
    if (!id) return; 

    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:3001/productos/${id}`);
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchProducto();
  }, [id]);  // Dependencia en `id`

  if (!producto) return <p>Cargando detalles del producto...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.modalHeading}>{producto.nombre_producto}</h1>
      <img src={producto.imagen} alt={producto.nombre_producto} className="img-fluid mb-3" />
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <p><strong>Detalle:</strong> {producto.detalle}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Proveedor:</strong> {producto.proveedor}</p>
    </div>
  );
}
