'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

export default function CarritoPage({ params }) {
  const { id_cliente } = React.use(params);  // Cambié esto para acceder correctamente al `id_cliente`
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

  async function handleRemoveProduct(idCliente, idProducto) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
  
    const res = await fetch(`http://localhost:3001/carrito/${idCliente}/producto/${idProducto}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete product from cart");
    }
  }

  const RemoveProduct = async (productoId) => {
    try {
      await handleRemoveProduct(id_cliente, productoId); // Llama a la función DELETE
  
      // Actualiza el estado del carrito después de eliminar el producto
      const updatedCarrito = carrito.productos.filter(prod => prod.idProducto !== productoId);
      setCarrito(prev => ({ ...prev, productos: updatedCarrito }));
    } catch (error) {
      console.error("Error eliminando producto:", error.message);
  
      if (error.message === "No token found" || error.message.includes("Failed to delete product from cart")) {
        alert("No se pudo eliminar el producto. Tu sesión puede haber expirado.");
        router.push("/login"); // Redirige a login si el token es inválido
      }
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
                <td>{producto.producto.nombre_producto}</td>
                <td>{producto.cantidad}</td>
                <td>${producto.precio}</td>
                <td>
                  <button onClick={() => RemoveProduct(producto.idProducto)}>
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
