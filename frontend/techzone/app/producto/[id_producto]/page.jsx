'use client';
import React, { useState, useEffect } from 'react';
import { use } from 'react';
import MasInfoProductos from '../../componentes/MasInfoProductos';

export default function ProductoPage({ params }) {
  // Utilizamos `React.use()` para desempaquetar los params
  const { id_producto } = use(params);  // Desempaquetamos correctamente

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:3001/productos/${id_producto}`);
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    if (id_producto) {
      fetchProducto();
    }
  }, [id_producto]);

  if (!producto) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <div>
      <h1>{producto.nombre_producto}</h1>
      <img src={producto.imagen} alt={producto.nombre_producto} className="img-fluid mb-3" />
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <p><strong>Detalle:</strong> {producto.detalle}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Proveedor:</strong> {producto.proveedor}</p>
    </div>
  );
}
