import React, { useEffect, useRef } from "react";
import "./Styles/PerfilMenu.css";

interface Props {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const PerfilMenu: React.FC<Props> = ({
  visible,
  onClose,
  onLogout,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="perfilMenu" ref={ref}>
      <div className="perfilMenu-section top">
        <strong>AngeKOL1</strong>
        <small>Mi perfil financiero</small>
      </div>

      <div className="perfilMenu-section">
        <button>📄 Mi perfil</button>
        <button>⭐ Trofeos</button>
        <button>🏆 Mis metas</button>
        <button>🧮 Presupuestos</button>
      </div>

      <div className="perfilMenu-section">
        <button>⚙ Configuración</button>
        <button>🎨 Apariencia</button>
      </div>

      <div className="perfilMenu-section logout">
        <button onClick={onLogout}>❌ Cerrar sesión</button>
      </div>
    </div>
  );
};
