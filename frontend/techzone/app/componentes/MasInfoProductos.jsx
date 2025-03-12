'use client';

import { useEffect, useState } from 'react';

export default function MasInfoProductos({ id }) {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        // Asegurándonos de usar `id_producto` en la consulta
        const res = await fetch(`http://localhost:3001/productos/${id}`);
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

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
