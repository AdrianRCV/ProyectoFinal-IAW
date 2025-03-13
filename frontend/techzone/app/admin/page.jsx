"use client";
import { useState } from "react";
import styles from "./page.module.css";

async function addProducto(formData) {
  try {
    const res = await fetch("http://localhost:3001/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

async function updateProducto(id, formData) {
  try {
    const res = await fetch(`http://localhost:3001/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
  const [modo, setModo] = useState("añadir");
  const [idProducto, setIdProducto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (modo === "añadir") {
      await addProducto(formData);
    } else if (modo === "modificar" && idProducto) {
      await updateProducto(idProducto, formData);
    } else if (modo === "eliminar" && idProducto) {
      await deleteProducto(idProducto);
    }

    form.reset();
    setIdProducto("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Administrar Productos</h1>

        <select className={styles.select} value={modo} onChange={(e) => setModo(e.target.value)}>
          <option value="añadir">Añadir Producto</option>
          <option value="modificar">Modificar Producto</option>
          <option value="eliminar">Eliminar Producto</option>
        </select>

        {(modo === "modificar" || modo === "eliminar") && (
          <input
            type="number"
            placeholder="ID del producto"
            className={styles.input}
            value={idProducto}
            onChange={(e) => setIdProducto(e.target.value)}
            required
          />
        )}

        {modo !== "eliminar" && (
          <form onSubmit={handleSubmit}>
            <input name="imagen" type="text" placeholder="URL de la imagen" className={styles.input} required />
            <input name="nombre_producto" type="text" placeholder="Nombre del producto" className={styles.input} required />
            <input name="categoria" type="text" placeholder="Categoría" className={styles.input} required />
            <textarea name="detalle" placeholder="Detalle" className={styles.input} required />
            <input name="precio" type="number" step="0.01" placeholder="Precio" className={styles.input} required />
            <button type="submit" className={`${styles.button} ${styles.spaceY}`}>
              {modo === "añadir" ? "Agregar Producto" : "Actualizar Producto"}
            </button>
          </form>
        )}

        {modo === "eliminar" && idProducto && (
          <button onClick={handleSubmit} className={`${styles.button} ${styles.spaceY}`}>
            Eliminar Producto
          </button>
        )}
      </div>
    </div>
  );
}




