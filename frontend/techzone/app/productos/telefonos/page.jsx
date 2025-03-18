'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import styles from '../../page.module.css';

export default function Moviles() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        console.log('Iniciando petición a API para móviles...');
        
        const res = await fetch('http://localhost:3001/productos/');
        
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        
        const data = await res.json();
        console.log(`Datos recibidos: ${data.length} productos`);
        
        const moviles = data.filter(producto => 
          producto.categoria && 
          (producto.categoria.toLowerCase().includes('movil'))
        );
        
        console.log(`Móviles encontrados: ${moviles.length}`);
        setProductos(moviles);
      } catch (error) {
        console.error('Error al obtener móviles:', error);
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleSeeMore = (producto) => {
    if (producto && producto.idProducto) {
      router.push(`/producto/${producto.idProducto}`);
    } else {
      console.error("Producto sin idProducto:", producto);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (loading) {
    return <div>Cargando móviles...</div>;
  }

  if (productos.length === 0) {
    return <div>No se encontraron móviles disponibles</div>;
  }

  return (
    <div>
      <div className={styles.cardsContainer}>
        {productos.map((producto) => (
          <div className={styles.postCard} key={producto.idProducto || `movil-${Math.random()}`}>
            <h5 className={styles.TituProducto}>{producto.nombre_producto}</h5>
            <img
              src={producto.imagen}
              alt={producto.nombre_producto}
              className={styles.productImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            <div className={styles.cardBody}>
              <Button 
                variant="primary" 
                onClick={() => handleSeeMore(producto)} 
                className={styles.MasInfo}
              >
                Más Información
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}