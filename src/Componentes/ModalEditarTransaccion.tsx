import React, { useState } from "react";
import { useTransaccionesContext } from "../hooks/TransaccionesContext";
import type { EditarTransaccionDTO } from "../dto/EditarTransaccionDTO";
import type { Transaccion } from "../modelos/Transaccion";
import "./Styles/ModalTransacciones.css";

interface Props {
  transaccion: Transaccion;
  onClose: () => void;
}

export const ModalEditarTransaccion: React.FC<Props> = ({
  transaccion,
  onClose,
}) => {
  const { updateTransaccion } = useTransaccionesContext();

  const [monto, setMonto] = useState<number>(transaccion.monto);
  const [descripcion, setDescripcion] = useState<string>(transaccion.descripcion);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const dto: EditarTransaccionDTO = {
      monto,
      descripcion
    };

    try {
      await updateTransaccion(transaccion.idTransaccion, dto);
      onClose();
    } catch (error) {
      console.error("Error al editar transacción:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container glass">
        
        <button className="modal-close" onClick={onClose}>✖</button>

        <h2>Editar Transacción ✏️</h2>

        <form onSubmit={handleSubmit}>

          <label>Monto</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
            min={0}
            step={0.01}
            required
          />

          <label>Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ej. Aporte adicional"
            required
          />

          <button type="submit" className="btn-guardar" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>

        </form>
      </div>
    </div>
  );
};
