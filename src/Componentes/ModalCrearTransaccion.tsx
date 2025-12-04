import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useTransaccionesContext } from "../hooks/TransaccionesContext";
import type { CrearTransaccionDTO } from "../dto/CrearTransaccionDTO";
import "./Styles/ModalTransacciones.css";

interface Props {
  onClose: () => void;
}

export const ModalCrearTransaccion: React.FC<Props> = ({ onClose }) => {
  const { addTransaccion, state } = useTransaccionesContext();
  const { selectedMetaId } = state;

  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<"Ingreso" | "Gasto">("Ingreso");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto: CrearTransaccionDTO = {
      monto: Number(monto),
      descripcion,
      tipoTransaccionId: tipo === "Ingreso" ? 2 : 1,
      idMeta: selectedMetaId ?? null,
      presupuestoId: null,
    };

    await addTransaccion(dto);
    onClose();
  };

  return createPortal(
    (
      <div className="trans-crear-overlay">
        <div className="trans-crear-container">

          <button className="trans-crear-close" onClick={onClose}>✖</button>

          <h2>Nueva Transacción</h2>

          <form onSubmit={handleSubmit}>

            <label>Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
            />

            <label>Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej. Aporte a meta"
              required
            />

            <label>Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as any)}
            >
              <option value="Ingreso">Ingreso</option>
              <option value="Gasto">Gasto</option>
            </select>

            <button className="trans-crear-btn" type="submit">
              Guardar
            </button>
          </form>

        </div>
      </div>
    ),
    document.getElementById("modal-root")!
  );
};
