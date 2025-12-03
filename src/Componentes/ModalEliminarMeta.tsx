// src/Componentes/ModalEliminarMeta.tsx
import React, { useState } from "react";
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
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const coincide = input.trim() === meta.nombre;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coincide) return;

    try {
      setLoading(true);
      await eliminarMeta(meta.idMeta);
      // Ideal: refrescar contexto de metas. Por ahora:
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar meta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-delete-container">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <h3>¿Eliminar esta meta?</h3>

        <p className="warning-text">
          Esta acción no se puede deshacer.  
          Para continuar, escribe el nombre exacto de la meta:
        </p>

        <p className="meta-name">“{meta.nombre}”</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Escribe el nombre aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="delete-actions">
            <button
              type="button"
              className="cancelar"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="eliminar"
              disabled={!coincide || loading}
            >
              {loading ? "Eliminando..." : "Eliminar meta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
