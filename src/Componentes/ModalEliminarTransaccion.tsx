import React, { useState } from "react";
import { useTransaccionesContext } from "../hooks/TransaccionesContext";
import type { Transaccion } from "../modelos/Transaccion";
import "./Styles/ModalTransacciones.css";

interface Props {
  transaccion: Transaccion;
  onClose: () => void;
}

export const ModalEliminarTransaccion: React.FC<Props> = ({
  transaccion,
  onClose,
}) => {
  const { removeTransaccion } = useTransaccionesContext();

  const [confirmMonto, setConfirmMonto] = useState("");

  const esCorrecto = Number(confirmMonto) === transaccion.monto;

  const handleDelete = async () => {
    if (!esCorrecto) return;
    await removeTransaccion(transaccion.idTransaccion);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container glass delete-modal">
        <button className="modal-close" onClick={onClose}>✖</button>

        <h2>Eliminar Transacción</h2>

        <p className="texto-eliminar">
          Para confirmar, escribe el monto exacto:
        </p>

        <p className="monto-eliminar">
          <strong>S/ {transaccion.monto.toLocaleString("es-PE")}</strong>
        </p>

        <input
          type="number"
          placeholder="Escribe el monto exacto"
          value={confirmMonto}
          onChange={(e) => setConfirmMonto(e.target.value)}
        />

        <button
          className="btn-eliminar-confirmar"
          disabled={!esCorrecto}
          onClick={handleDelete}
        >
          Eliminar Definitivamente
        </button>
      </div>
    </div>
  );
};
