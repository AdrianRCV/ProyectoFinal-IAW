'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Productos() {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [selectedProducto, setSelectedProducto] = useState(null); // Producto seleccionado para ver detalles
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const router = useRouter();

  // Función para obtener todos los productos de la API
  const fetchProductos = async () => {
    try {
      const res = await fetch('http://localhost:3001/productos/');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  // Llamada inicial para cargar los productos
  useEffect(() => {
    fetchProductos();
  }, []);

  // Función para manejar el click en "¿Saber más?" y obtener el detalle del producto
  const handleSeeMore = async (producto) => {
    try {
      // Se asume que cada producto cuenta con un identificador (producto.id) para obtener más detalles
      const res = await fetch(`http://localhost:3001/productos/${producto.id}`);
      const detail = await res.json();
      setSelectedProducto(detail);
      setShowModal(true);
    } catch (error) {
      console.error('Error al obtener el detalle del producto:', error);
    }
  };

  // Función para cerrar el modal y refrescar la lista (si se desea)
  const handleCloseModal = () => {
    setShowModal(false);
    // Opcionalmente se puede redirigir a otra ruta o refrescar la lista
    // router.push('/productos');
    fetchProductos();
  };

  return (
    <div>
      <h1 className="text-center">Productos</h1>
      {productos.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {productos.map((producto, index) => (
            <div className="card" key={index} style={{ width: '18rem' }}>
              <img
                src={producto.imagen}
                alt={producto.nombre_producto}
                className="card-img-top"
              />
              <div className="card-body">
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

      {/* Modal para ver los detalles del producto */}
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
                <strong>Proveedor:</strong> {selectedProducto.proveedorldProveedor}
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
