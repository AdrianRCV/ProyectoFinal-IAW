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

export default function CarritoPage({ params }) {
  const paramsResolved = React.use(params);
  const id_cliente = paramsResolved.id_cliente;
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchCarrito = async (idCliente) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        throw new Error("No estás autenticado. Por favor, inicia sesión para ver tu carrito.");
      }

      const res = await fetch(`http://localhost:3001/carrito/${idCliente}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          const createRes = await fetch('http://localhost:3001/carrito', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ usuarioId: idCliente }),
          });

          if (!createRes.ok) {
            const errorData = await createRes.json();
            throw new Error(errorData.message || 'Error al crear el carrito');
          }

          const newCarrito = await createRes.json();
          setCarrito(newCarrito);
          return;
        }
        throw new Error('Error al obtener el carrito');
      }

      const data = await res.json();
      setCarrito(data);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      setError(error.message);
      if (error.message.includes("No estás autenticado")) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;//para conseguir el token
    console.log("Token almacenado:", token);

    if (token) {
      const idCliente = decodeToken(token);//consigue el id del cliente del token
      console.log("ID del cliente desde el token:", idCliente);

      if (!idCliente) {
        console.error("No se pudo obtener el ID del usuario desde el token.");
        router.push('/login');
        return;
      }

      if (idCliente !== Number(paramsResolved.id_cliente)) {
        console.log("Redirigiendo al carrito correcto...");
        router.push(`/carrito/${idCliente}`);
        return;
      }

      fetchCarrito(idCliente);
    } else {
      router.push('/login');
    }
  }, [paramsResolved.id_cliente]);

  const handleRemoveProduct = async (idProducto) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) throw new Error("No estás autenticado. Por favor, inicia sesión.");
  
      if (!carrito || !carrito.idCarrito) {
        throw new Error("No se pudo obtener el ID del carrito.");
      }
  
      const res = await fetch(`http://localhost:3001/carrito/${carrito.idCarrito}/producto/${idProducto}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al eliminar el producto del carrito");
      }
  
      // Actualizar el estado del carrito
      const updatedProductos = carrito.productos.map(prod => {
        if (prod.producto.idProducto === idProducto) {
          if (prod.cantidad > 1) {
            return { ...prod, cantidad: prod.cantidad - 1 }; 
          } else {
            return null; 
          }
        }
        return prod;
      }).filter(prod => prod !== null); // Filtrar los productos eliminados
  
      setCarrito({
        ...carrito,
        productos: updatedProductos,
      });
    } catch (error) {
      console.error("Error eliminando producto:", error.message);
      setError(error.message);
      if (error.message.includes("No estás autenticado")) router.push('/login');
    }
  };

  if (loading) {
    return <p>Cargando carrito...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!carrito) {
    return <p>No se pudo cargar el carrito.</p>;
  }

  const calcularTotalCarrito = (productos) => {
    return productos.reduce((total, carritoProducto) => {
      const precio = Number(carritoProducto.producto.precio);
      const cantidad = Number(carritoProducto.cantidad);
      return total + (precio * cantidad);
    }, 0);
  };
  
  return (
    <div className={styles.ContCarrito}>
      <h1>Carrito de Compras</h1>
      {carrito.productos.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <table className={styles.TableCarrito}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.productos.map((carritoProducto) => {
                const precio = Number(carritoProducto.producto.precio);
                const total = precio * carritoProducto.cantidad;
  
                return (
                  <tr key={carritoProducto.producto.idProducto}>
                    <td>{carritoProducto.producto.nombre_producto}</td>
                    <td>{carritoProducto.cantidad}</td>
                    <td>${!isNaN(precio) ? precio.toFixed(2) : "N/A"}</td>
                    <td>${!isNaN(total) ? total.toFixed(2) : "N/A"}</td>
                    <td>
                      <button onClick={() => handleRemoveProduct(carritoProducto.producto.idProducto)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.totalCarrito}>
            <h3>Total del Carrito: ${calcularTotalCarrito(carrito.productos).toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
}