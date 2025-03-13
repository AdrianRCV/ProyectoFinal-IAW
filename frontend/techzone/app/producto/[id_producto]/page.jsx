'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

export default function ProductoPage({ params }) {
  const { id_producto } = React.use(params);
  const [producto, setProducto] = useState(null);
  const [carritoId, setCarritoId] = useState(null);
  const router = useRouter();

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

    const fetchCarrito = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token disponible.");
          return;
        }

        const userId = 1;
        let res = await fetch(`http://localhost:3001/carrito/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if (res.status === 404) {
          res = await fetch('http://localhost:3001/carrito', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ usuarioId: userId }),
          });

          if (!res.ok) {
            throw new Error('Error al crear el carrito');
          }
        }

        const data = await res.json();
        setCarritoId(data.idCarrito);
      } catch (error) {
        console.error('Error al obtener o crear el carrito del usuario:', error);
      }
    };

    if (id_producto) {
      fetchProducto();
      fetchCarrito();
    }
  }, [id_producto]);

  const handleAddToCart = async () => {
    if (!carritoId) {
      console.error("No se ha encontrado el carrito.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/carrito/${carritoId}/producto/${id_producto}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          cantidad: 1,
        }),
      });

      if (!res.ok) throw new Error("Error al añadir el producto al carrito");
      router.push(`/carrito/${carritoId}`);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    }
  };

  if (!producto) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <div className={styles.ContDetalles}>
      <img src={producto.imagen} alt={producto.nombre_producto} className={styles.imgProducto} />
      <div className={styles.detalles}>
        <h1>{producto.nombre_producto}</h1>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Detalle:</strong> {producto.detalle}</p>
        <p><strong>Precio:</strong> ${producto.precio}</p>
        <p><strong>Proveedor:</strong> {producto.proveedor}</p>
        <button className={styles.botonCarrito} onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
