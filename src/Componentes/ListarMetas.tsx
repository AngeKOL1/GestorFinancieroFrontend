import React from "react";
import { useMetasContext } from "../hooks/MetasContext";
import { useTransaccionesContext } from "../hooks/TransaccionesContext";
import type { Meta } from "../modelos/Meta";

interface Props {
  busqueda: string;
  onEditar: (metaId: number) => void;
  onEliminar: (metaId: number, nombre: string) => void;
  onVerDetalle: (meta: Meta) => void;
}

export const ListarMetas: React.FC<Props> = ({
  busqueda,
  onEditar,
  onEliminar,
  onVerDetalle,
}) => {
  const { state } = useMetasContext();
  const { metas, loading, error } = state;

  const { selectMeta } = useTransaccionesContext();

  if (loading) return <p>Cargando metas...</p>;
  if (error) return <p>Error: {error}</p>;

  const texto = busqueda.trim().toLowerCase();

  const metasFiltradas = metas.filter((m) => {
    const fechaInicial = new Date(m.fechaInicial)
      .toLocaleDateString("es-PE")
      .toLowerCase();

    const fechaFinal = new Date(m.fechaFinal)
      .toLocaleDateString("es-PE")
      .toLowerCase();

    return (
      m.nombre.toLowerCase().includes(texto) ||
      m.montoActual.toString().includes(texto) ||
      m.montoObjetivo.toString().includes(texto) ||
      fechaInicial.includes(texto) ||
      fechaFinal.includes(texto)
    );
  });

  return (
    <div className="mostramosMetas">
      {metasFiltradas.length === 0 ? (
        <p>No se encontraron resultados para "{busqueda}".</p>
      ) : (
        metasFiltradas.map((meta) => (
          <div
            className="meta fadeIn"
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
                <strong>S/ {meta.montoObjetivo.toLocaleString("es-PE")}</strong>
              </p>

              <div className="btnsMetas">
                <button
                  className="btn-detalle"
                  onClick={(e) => {
                    e.stopPropagation();       
                    onVerDetalle(meta);
                  }}
                >
                  Ver detalle
                </button>

                <button
                  className="btn-editar"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditar(meta.idMeta);
                  }}
                >
                  Editar
                </button>

                <button
                  className="btn-eliminar"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEliminar(meta.idMeta, meta.nombre);
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
  );
};
