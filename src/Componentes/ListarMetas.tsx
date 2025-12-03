import React, { useState } from "react";
import { useMetasContext } from "../hooks/MetasContext";
import { useTransaccionesContext } from "../hooks/TransaccionesContext";
import type { Meta } from "../modelos/Meta";
import { ModalEditarMeta } from "./ModalEditarMeta";
import { ModalEliminarMeta } from "./ModalEliminarMeta";

export const ListarMetas: React.FC = () => {
  const { state } = useMetasContext();
  const { metas, loading, error } = state;

  const { selectMeta } = useTransaccionesContext();

  const [metaSeleccionada, setMetaSeleccionada] = useState<Meta | null>(null);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);

  if (loading) return <p>Cargando metas...</p>;
  if (error) return <p>Error: {error}</p>;

  const abrirEditar = (meta: Meta) => {
    setMetaSeleccionada(meta);
    setMostrarEditar(true);
  };

  const abrirEliminar = (meta: Meta) => {
    setMetaSeleccionada(meta);
    setMostrarEliminar(true);
  };

  const cerrarModales = () => {
    setMostrarEditar(false);
    setMostrarEliminar(false);
    setMetaSeleccionada(null);
  };

  return (
    <>
      <div className="mostramosMetas">
        {metas.length === 0 ? (
          <p>No tienes metas registradas aún.</p>
        ) : (
          metas.map((meta) => (
            <div
              className="meta"
              key={meta.idMeta}
              onClick={() => selectMeta(meta.idMeta, meta.nombre)}
            >
              <div className="parteSuperior">
                <h3>{meta.nombre}</h3>
                <div>
                  <p className="fecha">
                    📅 Inicio:{" "}
                    {new Date(meta.fechaInicial).toLocaleDateString("es-PE")}
                  </p>
                  <p className="fecha">
                    📅 Fin:{" "}
                    {new Date(meta.fechaFinal).toLocaleDateString("es-PE")}
                  </p>
                </div>
              </div>

              <div className="parteInferiorMeta">
                <p className="monto">
                  💰 Monto actual:{" "}
                  <strong>S/ {meta.montoActual.toLocaleString("es-PE")}</strong>
                </p>

                <p className="monto">
                  🎯 Meta objetivo:{" "}
                  <strong>
                    S/ {meta.montoObjetivo.toLocaleString("es-PE")}
                  </strong>
                </p>

                <div className="btnsMetas">
                  <button
                    className="btn-editar"
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirEditar(meta);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirEliminar(meta);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {metaSeleccionada && mostrarEditar && (
        <ModalEditarMeta meta={metaSeleccionada} onClose={cerrarModales} />
      )}

      {metaSeleccionada && mostrarEliminar && (
        <ModalEliminarMeta meta={metaSeleccionada} onClose={cerrarModales} />
      )}
    </>
  );
};
