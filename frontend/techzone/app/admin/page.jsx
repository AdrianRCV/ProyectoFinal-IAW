"use client";
import styles from "./page.module.css";

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

    if (!res.ok) {
      throw new Error("Error al agregar el producto");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export default function AdminProductos() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.currentTarget; 
    const formData = new FormData(form);
  
    await addProducto(formData);
  
    if (form) {
      form.reset(); 
    }
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
            required
          />
          <input
            name="nombre_producto"
            type="text"
            placeholder="Nombre del producto"
            className={styles.input}
            required
          />
          <input
            name="categoria"
            type="text"
            placeholder="Categoría"
            className={styles.input}
            required
          />
          <textarea
            name="detalle"
            placeholder="Detalle"
            className={styles.input}
            required
          />
          <input
            name="precio"
            type="number"
            step="0.01"
            placeholder="Precio"
            className={styles.input}
            required
          />
          <button type="submit" className={`${styles.button} ${styles.spaceY}`}>
            Agregar Producto
          </button>
        </form>
      </div>
    </div>
  );
}




