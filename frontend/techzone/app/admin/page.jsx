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

    // Opcional: obtener respuesta en JSON si el backend la envía
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export default function AdminProductos() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await addProducto(formData);
    e.currentTarget.reset();
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Administrar Productos</h1>
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
        <input
          name="imagen"
          type="text"
          placeholder="URL de la imagen"
          className="block w-full p-2 border rounded"
          required
        />
        <input
          name="nombre_producto"
          type="text"
          placeholder="Nombre del producto"
          className="block w-full p-2 border rounded"
          required
        />
        <input
          name="categoria"
          type="text"
          placeholder="Categoría"
          className="block w-full p-2 border rounded"
          required
        />
        <textarea
          name="detalle"
          placeholder="Detalle"
          className="block w-full p-2 border rounded"
          required
        />
        <input
          name="precio"
          type="number"
          step="0.01"
          placeholder="Precio"
          className="block w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Agregar Producto
        </button>
      </form>
    </div>
  );
}

