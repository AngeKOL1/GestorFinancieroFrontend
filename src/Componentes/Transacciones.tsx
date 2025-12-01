import React from "react";
import { useTransaccionesContext } from "../hooks/TransaccionesContext";
import type { Transaccion } from "../modelos/Transaccion";

export const Transacciones = () => {
  const { state } = useTransaccionesContext();
  const { transacciones, loading, selectedMetaName } = state;

  if (loading) return <p>Cargando transacciones...</p>;

  const lista: Transaccion[] = Array.isArray(transacciones)
    ? transacciones
    : [];

  console.log("📌 Transacciones render:", lista);

  return (
    <aside className="despliegueMeta">
      <div className="graficosMetas"></div>

      <div className="infoMeta">

        <textarea
          readOnly
          value={selectedMetaName ?? "Todas las transacciones"}
        />

        <h3 className="tituloTransacciones">
          {selectedMetaName
            ? `Transacciones de ${selectedMetaName}`
            : "Transacciones recientes"}
        </h3>

        <div className="ingresos-gastos">
          {lista.length === 0 ? (
            <p>No hay transacciones para mostrar.</p>
          ) : (
            lista.map((t) => {
              const esIngreso = t.tipoTransaccionId === 2;

              return (
                <div className="transacciones" key={t.idTransaccion}>
                  <div className="dato monto">
                    S/ {t.monto.toLocaleString("es-PE")}
                  </div>

                  <div className={`dato tipo ${esIngreso ? "ingreso" : "gasto"}`}>
                    {esIngreso ? "Ingreso" : "Gasto"}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </aside>
  );
};
