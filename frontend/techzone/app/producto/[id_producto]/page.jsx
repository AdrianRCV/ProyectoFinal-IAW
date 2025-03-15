'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

const decodeToken = (token) => {
  try {
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    if (!decodedPayload.id_cliente) {
      throw new Error("El token no contiene el ID del usuario (id_cliente).");
    }
    return decodedPayload.id_cliente;
  } catch (error) {
    console.error("Error decodificando el token:", error);
    return null;
  }
};

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

    if (id_producto) {
      fetchProducto();
    }
  }, [id_producto]);

  const checkIfProductInCart = async (token, cartId) => {
    try {
      const res = await fetch(`http://localhost:3001/carrito/${cartId}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener el carrito");

      const carrito = await res.json();
      return carrito.productos.some((prod) => prod.producto.idProducto === id_producto);
    } catch (error) {
      console.error("Error al verificar el carrito:", error);
      return false;
    }
  };

  const addProductToCart = async (token, cartId) => {
    try {
      const res = await fetch(`http://localhost:3001/carrito-producto/${cartId}/producto/${id_producto}`, {
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
      router.push(`/carrito/${cartId}`);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      alert("Error al añadir el producto al carrito. Por favor, intenta de nuevo.");
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión para añadir productos al carrito.");
      router.push('/login');
      return;
    }

    const id_cliente = decodeToken(token);
    if (!id_cliente) {
      alert("Error al obtener el ID del usuario. Por favor, inicia sesión nuevamente.");
      router.push('/login');
      return;
    }

    try {
      if (!carritoId) {
        let res = await fetch(`http://localhost:3001/carrito/${id_cliente}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (res.status === 404) {
          res = await fetch('http://localhost:3001/carrito', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ usuarioId: id_cliente }),
          });

          if (!res.ok) throw new Error('Error al crear el carrito');
        }

        const data = await res.json();
        setCarritoId(data.idCarrito);
        await addProductToCart(token, data.idCarrito);
      } else {
        const productInCart = await checkIfProductInCart(token, carritoId);
        if (productInCart) {
          alert("Este producto ya está en tu carrito.");
        } else {
          await addProductToCart(token, carritoId);
        }
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      alert("Error al añadir el producto al carrito. Por favor, intenta de nuevo.");
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