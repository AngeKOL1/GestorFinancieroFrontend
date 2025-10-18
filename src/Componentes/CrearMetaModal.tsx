import React from "react";
import "./Styles/ModalMeta.css";
import type { CrearMetaDTO } from "../DTO/CrearMetaDTO";

interface ModalMetaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CrearMetaDTO) => void;
}

export const ModalMeta: React.FC<ModalMetaProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const meta: CrearMetaDTO = {
      nombre: String(formData.get("nombre") || ""),
      montoObjetivo: Number(formData.get("montoObjetivo") || 0),
      fechaFinal: String(formData.get("fechaFinal") || ""),
      idCategoria: Number(formData.get("idCategoria") || 0),
      idMeta: Number(formData.get("idMeta") || 0),
      idEstadoMeta: Number(formData.get("idEstadoMeta") || 0),
    };

    try {
      await onSubmit(meta);
      onClose();
    } catch (error) {
      console.error("Error al crear meta:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2>Nueva Meta</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de la meta</label>
          <input type="text" name="nombre" placeholder="Ej. Comprar laptop" required />

          <label>Monto objetivo</label>
          <input type="number" name="montoObjetivo" placeholder="8900" required />

          <label>Fecha final</label>
          <input type="date" name="fechaFinal" required />

          <label>ID Categoría (temporal)</label>
          <input type="number" name="idCategoria" placeholder="2" required />

          <label>ID Tipo de meta</label>
          <input type="number" name="idMeta" placeholder="1" required />

          <label>ID Estado de meta</label>
          <input type="number" name="idEstadoMeta" placeholder="2" required />

          <button type="submit" className="btn-guardar">Guardar Meta</button>
        </form>
      </div>
    </div>
  );
};
