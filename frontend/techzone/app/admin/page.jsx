'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

async function addProducto(productoData) {
  try {
    const res = await fetch('http://localhost:3001/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoData),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || 'Error al agregar el producto');
    }
    
    return data;
  } catch (error) {
    console.error('Error en addProducto:', error);
    throw error;
  }
}

async function updateProducto(id, productoData) {
  try {
    const res = await fetch(`http://localhost:3001/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoData),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || 'Error al actualizar el producto');
    }
    
    return data;
  } catch (error) {
    console.error('Error en updateProducto:', error);
    throw error;
  }
}

async function deleteProducto(id) {
  try {
    const res = await fetch(`http://localhost:3001/productos/${id}`, {
      method: 'DELETE',
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || 'Error al eliminar el producto');
    }
    
    return data;
  } catch (error) {
    console.error('Error en deleteProducto:', error);
    throw error;
  }
}

export default function AdminProductos() {
  const [modo, setModo] = useState('añadir');
  const [idProducto, setIdProducto] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      router.push('/login');
      return;
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      if (modo === 'añadir' || modo === 'modificar') {
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        // Convert FormData to a plain object
        const productoData = {
          nombre_producto: formData.get('nombre_producto'),
          imagen: formData.get('imagen'),
          categoria: formData.get('categoria'),
          detalle: formData.get('detalle'),
          precio: parseFloat(formData.get('precio')),
        };
        
        if (modo === 'añadir') {
          await addProducto(productoData);
          setSuccess('Producto agregado correctamente');
          form.reset();
        } else if (modo === 'modificar' && idProducto) {
          await updateProducto(idProducto, productoData);
          setSuccess('Producto actualizado correctamente');
          form.reset();
        }
      } else if (modo === 'eliminar' && idProducto) {
        await deleteProducto(idProducto);
        setSuccess('Producto eliminado correctamente');
        setIdProducto('');
      }
    } catch (err) {
      setError(err.message || 'Ha ocurrido un error');
    }
  };

  const handleDeleteClick = async () => {
    setError('');
    setSuccess('');
    
    try {
      if (idProducto) {
        await deleteProducto(idProducto);
        setSuccess('Producto eliminado correctamente');
        setIdProducto('');
      } else {
        setError('Por favor, introduce un ID de producto válido');
      }
    } catch (err) {
      setError(err.message || 'Ha ocurrido un error al eliminar el producto');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Administrar Productos</h1>
        
        {error && (
          <div className={`${styles.message} ${styles.error}`}>
            {error}
          </div>
        )}
        
        {success && (
          <div className={`${styles.message} ${styles.success}`}>
            {success}
          </div>
        )}

        <select className={styles.select} value={modo} onChange={(e) => setModo(e.target.value)}>
          <option value="añadir">Añadir Producto</option>
          <option value="modificar">Modificar Producto</option>
          <option value="eliminar">Eliminar Producto</option>
        </select>

        {(modo === 'modificar' || modo === 'eliminar') && (
          <input
            type="number"
            placeholder="ID del producto"
            className={styles.input}
            value={idProducto}
            onChange={(e) => setIdProducto(e.target.value)}
            required
          />
        )}

        {modo !== 'eliminar' && (
          <form onSubmit={handleSubmit}>
            <input name="imagen" type="text" placeholder="URL de la imagen" className={styles.input} required />
            <input name="nombre_producto" type="text" placeholder="Nombre del producto" className={styles.input} required />
            <input name="categoria" type="text" placeholder="Categoría" className={styles.input} required />
            <textarea name="detalle" placeholder="Detalle" className={styles.input} required />
            <input name="precio" type="number" step="0.01" placeholder="Precio" className={styles.input} required />
            <button type="submit" className={`${styles.button} ${styles.spaceY}`}>
              {modo === 'añadir' ? 'Agregar Producto' : 'Actualizar Producto'}
            </button>
          </form>
        )}

        {modo === 'eliminar' && idProducto && (
          <button onClick={handleDeleteClick} className={`${styles.button} ${styles.spaceY}`}>
            Eliminar Producto
          </button>
        )}
      </div>
    </div>
  );
}



