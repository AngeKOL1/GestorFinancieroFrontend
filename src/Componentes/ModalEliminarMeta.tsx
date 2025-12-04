import React, { useState } from "react";
import ReactDOM from "react-dom";
import type { Meta } from "../modelos/Meta";
import { eliminarMeta } from "../service/MetaService";
import "./Styles/ModalDelete.css";

interface ModalEliminarMetaProps {
  meta: Meta;
  onClose: () => void;
}

export const ModalEliminarMeta: React.FC<ModalEliminarMetaProps> = ({
  meta,
  onClose,
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const coincide = input.trim() === meta.nombre;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coincide) return;

    setLoading(true);
    try {
      await eliminarMeta(meta.idMeta);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const modal = (
    <div className="delm-overlay">
      <div className="delm-box">

        <button className="delm-close" onClick={onClose}>✖</button>

        <h3 className="delm-title">¿Eliminar esta meta?</h3>

        <p className="delm-warning">
          Esta acción no se puede deshacer.  
          Para continuar escribe el nombre exacto:
        </p>

        <p className="delm-meta-name">“{meta.nombre}”</p>

        <form onSubmit={handleSubmit}>
          <input
            className="delm-input"
            type="text"
            placeholder="Escribe el nombre aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="delm-actions">
            <button
              type="button"
              className="delm-btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="delm-btn-confirm"
              disabled={!coincide || loading}
            >
              {loading ? "Eliminando..." : "Eliminar meta"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root")!);
};
