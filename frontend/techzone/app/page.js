'use client';

import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Styles from './page.module.css';

export default function RandomProductosPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://localhost:3001/productos');
        const allPosts = await res.json();
        const randomPosts = allPosts.sort(() => Math.random() - 0.5).slice(0, 5);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleShowModal = async (post) => {
    setSelectedPost(post);
    setShowModal(true);
    setModalLoading(true);
    setModalError(null);
    try {
      const [productos] = await Promise.all([
        fetch(`https://localhost:3001/productos${producto.idProducto}`)
      ]);
      const userData = await productos.json();

      setproducto(idProducto);
      setModalLoading(false);
    } catch (err) {
      setModalError(err);
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setPostUser(null);
    setPostComments([]);
    setShowModal(false);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={Styles.container}>
      <h1 className={Styles.heading}>10 Posts Aleatorios</h1>
      <div className={Styles.cardsContainer}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={Styles.postCard}
            onClick={() => handleShowModal(post)}
          >
            <h3 className={Styles.cardTitle}>{post.title}</h3>
            <p className={Styles.cardText}>{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className={Styles.modalTitle}>Detalle del Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <>
              <h2 className={Styles.modalHeading}>{selectedPost.title}</h2>
              <p>{selectedPost.body}</p>
              {modalLoading ? (
                <p>Cargando detalles...</p>
              ) : modalError ? (
                <p>Error cargando detalles: {modalError.message}</p>
              ) : (
                <>
                  {postUser && (
                    <div>
                      <h4 className={Styles.userInfoHeading}>Información del Usuario</h4>
                      <p><strong>Nombre:</strong> {postUser.name}</p>
                      <p><strong>Email:</strong> {postUser.email}</p>
                      <p><strong>Sitio Web:</strong> {postUser.website}</p>
                    </div>
                  )}
                  {postComments.length > 0 && (
                    <div>
                      <h4 className={Styles.userInfoHeading}>Comentarios</h4>
                      <ul>
                        {postComments.map((comment) => (
                          <li key={comment.id} style={{ marginBottom: '10px' }}>
                            <p>
                              <strong>{comment.name}</strong> ({comment.email})
                            </p>
                            <p>{comment.body}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </>
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