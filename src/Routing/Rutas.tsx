import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Rutas.module.css';

export const Rutas = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.classList.remove(styles.darkMode, styles.lightMode);

    if (theme === "dark") {
      document.body.classList.add(styles.darkMode);
    } else {
      document.body.classList.add(styles.lightMode);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header className={`${styles.header} fade-down`}>
        <div className={styles.logo}>GGestor</div>

        <nav className={styles.navLinks} aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#funciones">Funciones</a>
          <a href="#ayuda">Ayuda</a>
          <a href="#descargar">Descargar</a>

          <button
            onClick={toggleTheme}
            aria-label="Cambiar modo de color"
            className={styles.themeToggle}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          <NavLink to="/login" className={styles.btnLogin}>
            Inicia Sesión
          </NavLink>
        </nav>
      </header>

      <main className={`${styles.mainContent} fade-in`}>
        <h1 className="fade-up">Tu dinero, tus metas, tu juego.</h1>
        <p className="fade-up delay-1">
          Convierte la gestión de tus finanzas en una experiencia divertida.
          Ahorra, gana recompensas y alcanza tus metas con GGestor.
        </p>

        <NavLink to="/registro" className={`${styles.btnPrimary} fade-up delay-2`}>
          Empieza gratis
        </NavLink>
      </main>

      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
      <div className={`${styles.blob} ${styles.blob3}`}></div>


      <footer className={`${styles.footer} fade-in`}>
        © {new Date().getFullYear()} GGestor — Finanzas gamificadas para todos.
      </footer>
    </>
  );
};
