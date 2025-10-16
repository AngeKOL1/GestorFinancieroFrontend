import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Rutas.module.css';

export const Rutas = () => {

  // 🔹 Esto aplica el estilo del body SOLO mientras el componente está activo
  useEffect(() => {
    document.body.classList.add(styles.bodyFondo);
    return () => document.body.classList.remove(styles.bodyFondo);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>GGestor</div>
        <nav className={styles.navLinks}>
          <a href="#">Inicio</a>
          <a href="#">Funciones</a>
          <a href="#">Ayuda</a>
          <a href="#">Descargar</a>
          <NavLink to="/login" className={styles.btnLogin}>
            Inicia Sesión
          </NavLink>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <h1>Tu dinero, tus metas, tu juego.</h1>
        <p>
          Convierte la gestión de tus finanzas en una experiencia divertida y visual.  
          Ahorra, gana recompensas y alcanza tus metas con GGestor.
        </p>
        <NavLink to="/registro" className={styles.btnPrimary}>
          Empieza gratis
        </NavLink>
      </main>

      {/* Elementos decorativos */}
      <div className={`${styles.circle} ${styles.circle1}`}></div>
      <div className={`${styles.circle} ${styles.circle2}`}></div>

      <footer className={styles.footer}>
        © 2025 GGestor — Finanzas gamificadas para todos.
      </footer>
    </>
  );
};
