'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';

export default function Productos() {
  const [productos, setProductos] = useState([]); 
  const [selectedProducto, setSelectedProducto] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const router = useRouter();

  const fetchProductos = async () => {
    try {
      const res = await fetch('http://localhost:3001/productos/');
      if (!res.ok) throw new Error('Error en la respuesta del servidor');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSeeMore = async (producto) => {
    try {
      const res = await fetch(`http://localhost:3001/productos/${producto.id}`);
      if (!res.ok) throw new Error('Error en la respuesta del servidor');
      const detail = await res.json();
      setSelectedProducto(detail);
      setShowModal(true);
    } catch (error) {
      console.error('Error al obtener el detalle del producto:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchProductos();
  };

  return (
    <div>
      {productos.length > 0 ? (
        <div className={styles.cardsContainer}>
          {productos.map((producto) => (
            <div className={styles.postCard} key={producto.id}>
              <img
                src={producto.imagen}
                alt={producto.nombre_producto}
                className={`${styles.productImage} card-img-top`}
              />
              <div className={styles.cardBody}>
                <h5 className="card-title">{producto.nombre_producto}</h5>
                <p className="card-text">
                  <strong>Categoría:</strong> {producto.categoria}
                </p>
                <p className="card-text">
                  <strong>Precio:</strong> ${producto.precio}
                </p>
                <Button variant="primary" onClick={() => handleSeeMore(producto)}>
                  ¿Saber más?
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando productos...</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProducto?.nombre_producto}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProducto && (
            <div>
              <img
                src={selectedProducto.imagen}
                alt={selectedProducto.nombre_producto}
                className="img-fluid mb-3"
              />
              <p>
                <strong>Categoría:</strong> {selectedProducto.categoria}
              </p>
              <p>
                <strong>Detalle:</strong> {selectedProducto.detalle}
              </p>
              <p>
                <strong>Precio:</strong> ${selectedProducto.precio}
              </p>
              <p>
                <strong>Proveedor:</strong> {selectedProducto.proveedor}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}



