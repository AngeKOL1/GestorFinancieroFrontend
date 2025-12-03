import React, { useState } from "react";
import type { Meta } from "../modelos/Meta";
import type { EditarMetaDTO } from "../dto/EditarMetaDTO";
import { editarMeta } from "../service/MetaService";
import "./Styles/ModalMeta.css";

interface ModalEditarMetaProps {
  meta: Meta;
  onClose: () => void;
}

export const ModalEditarMeta: React.FC<ModalEditarMetaProps> = ({
  meta,
  onClose,
}) => {
  const fechaInicialInput = meta.fechaFinal
    ? new Date(meta.fechaFinal).toISOString().split("T")[0]
    : "";

  const [nombre, setNombre] = useState<string>(meta.nombre);
  const [fechaFinal, setFechaFinal] = useState<string>(fechaInicialInput);
  const [montoObjetivo, setMontoObjetivo] = useState<number>(
    meta.montoObjetivo
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const dto: EditarMetaDTO = {
      nombre,
      fechaFinal,
      montoObjetivo,
    };

    try {
      await editarMeta(meta.idMeta, dto);
      // idealmente recargarías el contexto; por ahora refrescamos la vista
      window.location.reload();
    } catch (error) {
      console.error("Error al editar meta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container edit-modal">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <h2>Editar meta ✏️</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre de la meta</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Fecha final</label>
          <input
            type="date"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
            required
          />

          <label>Monto objetivo</label>
          <input
            type="number"
            value={montoObjetivo}
            onChange={(e) => setMontoObjetivo(Number(e.target.value))}
            min={0}
            step={0.01}
            required
          />

          <button type="submit" className="btn-guardar" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
};
