import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} text-center text-lg-start text-white`}>
      <section className={styles["footer-content"]}>
        <div className="container text-center">
          <div className="row">
            <div className="col-12 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
              <p>
                <strong>Dirección:</strong> Calle Alcalá, 32, 28014 Madrid, España
              </p>
              <p>
                <strong>Correo electrónico:</strong> contacto@techzone.com
              </p>
              <p>
                <strong>Teléfono:</strong> +34 912 345 678
              </p>
              <p>
                <strong>Fax:</strong> +34 912 345 679
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className={`${styles["footer-copyright"]} text-center p-4`}>
        © {new Date().getFullYear()} - Todos los derechos reservados
      </div>
    </footer>
  );
}
