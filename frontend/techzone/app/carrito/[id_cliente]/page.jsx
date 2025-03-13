'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

export default function CarritoPage({ params }) {
  const { id_cliente } = React.use(params); 
  const [carrito, setCarrito] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token disponible.");
          return;
        }

        const res = await fetch(`http://localhost:3001/carrito/${id_cliente}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Error al obtener el carrito');

        const data = await res.json();
        setCarrito(data); 
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    if (id_cliente) {
      fetchCarrito();
    }
  }, [id_cliente]);

  const handleRemoveProduct = async (productoId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/carrito/${id_cliente}/producto/${productoId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar el producto");

      const updatedCarrito = carrito.productos.filter(prod => prod.idProducto !== productoId);
      setCarrito(prev => ({ ...prev, productos: updatedCarrito }));
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  if (!carrito) {
    return <p>Cargando carrito...</p>;
  }

  return (
    <div className={styles.ContCarrito}>
      <h1>Carrito de Compras</h1>
      {carrito.productos.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.productos.map((producto, index) => (
              <tr key={producto.idProducto || `producto-${index}`}>
                <td>{producto.nombre_producto}</td>
                <td>{producto.cantidad}</td>
                <td>${producto.precio}</td>
                <td>
                  <button onClick={() => handleRemoveProduct(producto.idProducto)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
