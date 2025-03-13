"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

// Función para obtener todos los productos
async function fetchProductos() {
  try {
    const res = await fetch("http://localhost:3001/productos");
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Función para agregar un producto
async function addProducto(formData) {
  try {
    const res = await fetch("http://localhost:3001/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_producto: formData.get("nombre_producto"),
        imagen: formData.get("imagen"),
        categoria: formData.get("categoria"),
        detalle: formData.get("detalle"),
        precio: parseFloat(formData.get("precio")),
      }),
    });
    if (!res.ok) throw new Error("Error al agregar el producto");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

// Función para actualizar un producto existente
async function updateProducto(id, formData) {
  try {
    const res = await fetch(`http://localhost:3001/productos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_producto: formData.get("nombre_producto"),
        imagen: formData.get("imagen"),
        categoria: formData.get("categoria"),
        detalle: formData.get("detalle"),
        precio: parseFloat(formData.get("precio")),
      }),
    });
    if (!res.ok) throw new Error("Error al actualizar el producto");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

// Función para borrar un producto
async function deleteProducto(id) {
  try {
    const res = await fetch(`http://localhost:3001/productos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar el producto");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [editingProducto, setEditingProducto] = useState(null);

  useEffect(() => {
    loadProductos();
  }, []);

  // Cargar la lista de productos
  const loadProductos = async () => {
    const data = await fetchProductos();
    setProductos(data);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (editingProducto) {

      await updateProducto(editingProducto.id, formData);
      setEditingProducto(null);
    } else {
      await addProducto(formData);
    }
    form.reset();
    loadProductos();
  };

 
  const handleEdit = (producto) => {
    setEditingProducto(producto);
  };

  const handleDelete = async (id) => {
    await deleteProducto(id);
    loadProductos();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Administrar Productos</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="imagen"
            type="text"
            placeholder="URL de la imagen"
            className={styles.input}
            defaultValue={editingProducto ? editingProducto.imagen : ""}
            required
          />
          <input
            name="nombre_producto"
            type="text"
            placeholder="Nombre del producto"
            className={styles.input}
            defaultValue={
              editingProducto ? editingProducto.nombre_producto : ""
            }
            required
          />
          <input
            name="categoria"
            type="text"
            placeholder="Categoría"
            className={styles.input}
            defaultValue={editingProducto ? editingProducto.categoria : ""}
            required
          />
          <textarea
            name="detalle"
            placeholder="Detalle"
            className={styles.input}
            defaultValue={editingProducto ? editingProducto.detalle : ""}
            required
          />
          <input
            name="precio"
            type="number"
            step="0.01"
            placeholder="Precio"
            className={styles.input}
            defaultValue={editingProducto ? editingProducto.precio : ""}
            required
          />
          <button type="submit" className={`${styles.button} ${styles.spaceY}`}>
            {editingProducto ? "Actualizar Producto" : "Agregar Producto"}
          </button>
        </form>
      </div>

      <div className={styles.productList}>
        <h2>Lista de Productos</h2>
        {productos.map((producto) => (
          <div key={producto.id} className={styles.productItem}>
            <p>{producto.nombre_producto}</p>
            <button
              onClick={() => handleEdit(producto)}
              className={styles.button}
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(producto.id)}
              className={styles.button}
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}





