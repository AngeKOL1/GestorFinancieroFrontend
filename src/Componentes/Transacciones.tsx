import React, { useState } from "react";
import { useTransaccionesContext } from "../hooks/TransaccionesContext";
import type { Transaccion } from "../modelos/Transaccion";

import { ModalCrearTransaccion } from ".//ModalCrearTransaccion";
import { ModalEditarTransaccion } from "./ModalEditarTransaccion";
import { ModalEliminarTransaccion } from "./ModalEliminarTransaccion";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Transacciones = () => {
  const { state } = useTransaccionesContext();
  const { transacciones, loading, selectedMetaName } = state;

  const [showCrear, setShowCrear] = useState(false);
  const [editar, setEditar] = useState<Transaccion | null>(null);
  const [eliminar, setEliminar] = useState<Transaccion | null>(null);

  if (loading) return <p>Cargando transacciones...</p>;

  const lista: Transaccion[] = Array.isArray(transacciones) ? transacciones : [];
    const datosAgrupados = lista.reduce((acc: any, t) => {
    const fecha = new Date(t.fechaTransaccion).toLocaleDateString("es-PE");

    if (!acc[fecha]) {
      acc[fecha] = { fecha, ingresos: 0, gastos: 0 };
    }

    if (t.tipoTransaccionId === 2) {
      acc[fecha].ingresos += t.monto;
    } else {
      acc[fecha].gastos += t.monto;
    }

    return acc;
  }, {});

  const data = Object.values(datosAgrupados);

  return (
    <aside className="despliegueMeta">

      <div className="graficosMetas">
          {data.length === 0 ? (
            <p>No hay datos para graficar aún.</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend/>
                <Bar dataKey="ingresos" fill="#4ecb71" name="Ingresos" />
                <Bar dataKey="gastos" fill="#ff6464" name="Gastos" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      {/* Texto principal */}
      <h3 className="tituloTransacciones">
        {selectedMetaName
          ? `Transacciones de ${selectedMetaName}`
          : "Transacciones recientes"}
      </h3>

      {/* BOTÓN AGREGAR */}
      <button className="btn-agregar-transaccion" onClick={() => setShowCrear(true)}>
        + Nueva Transacción
      </button>

      {/* LISTADO */}
      <div className="ingresos-gastos">
        {lista.length === 0 ? (
          <p>No hay transacciones para mostrar.</p>
        ) : (
          lista.map((t) => {
            const esIngreso = t.tipoTransaccionId === 2;

            return (
              <div className="transaccion-item" key={t.idTransaccion}>
                <div className="dato monto">
                  S/ {t.monto.toLocaleString("es-PE")}
                </div>

                <div className={`dato tipo ${esIngreso ? "ingreso" : "gasto"}`}>
                  {esIngreso ? "Ingreso" : "Gasto"}
                </div>

                <button
                  className="btn-editar"
                  onClick={() => setEditar(t)}
                >
                  Editar
                </button>

                <button
                  className="btn-eliminar"
                  onClick={() => setEliminar(t)}
                >
                  Eliminar
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* MODALES */}
      {showCrear && <ModalCrearTransaccion onClose={() => setShowCrear(false)} />}
      
      {editar && (
        <ModalEditarTransaccion
          transaccion={editar}
          onClose={() => setEditar(null)}
        />
      )}

      {eliminar && (
        <ModalEliminarTransaccion
          transaccion={eliminar}
          onClose={() => setEliminar(null)}
        />
      )}

    </aside>
  );
};
