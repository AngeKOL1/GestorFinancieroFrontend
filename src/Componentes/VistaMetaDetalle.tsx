import React, { useMemo, useState } from "react";
import "./Styles/VistaMetaDetalle.css";

import type { Meta } from "../modelos/Meta";
import { useTransaccionesContext } from "../hooks/TransaccionesContext";
import type { Transaccion } from "../modelos/Transaccion";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { generarReporteMeta } from "../service/ReporteService";

interface Props {
  meta: Meta;
  onVolver: () => void;
}

export const VistaMetaDetalle: React.FC<Props> = ({ meta, onVolver }) => {
  const { state } = useTransaccionesContext();
  const { transacciones } = state;

  const [descargando, setDescargando] = useState(false);

  const porcentaje =
    meta.montoObjetivo > 0
      ? Math.min((meta.montoActual / meta.montoObjetivo) * 100, 100)
      : 0;

  // Transacciones asociadas a esta meta
  const transaccionesMeta = useMemo(() => transacciones ?? [], [transacciones]);


  // Datos para el gráfico circular
  const dataCircular = useMemo(() => {
    const restante = Math.max(meta.montoObjetivo - meta.montoActual, 0);

    return [
      { name: "Avance", value: meta.montoActual },
      { name: "Restante", value: restante },
    ];
  }, [meta.montoActual, meta.montoObjetivo]);

  // Datos para el gráfico de barras Ingreso vs Gasto por mes
  const dataBarras = useMemo(() => {
    const agrupado: Record<
      string,
      { mes: string; ingresos: number; gastos: number }
    > = {};

    transaccionesMeta.forEach((t) => {
      const fecha = new Date(t.fechaTransaccion);
      const mesNombre = fecha.toLocaleString("es-PE", {
        month: "short",
        year: "2-digit",
      });

      if (!agrupado[mesNombre]) {
        agrupado[mesNombre] = {
          mes: mesNombre,
          ingresos: 0,
          gastos: 0,
        };
      }

      if (t.tipoTransaccionId === 2) {
        // ingreso
        agrupado[mesNombre].ingresos += t.monto;
      } else {
        agrupado[mesNombre].gastos += t.monto;
      }
    });

    return Object.values(agrupado);
  }, [transaccionesMeta]);

  const fechaInicialStr = new Date(meta.fechaInicial).toLocaleDateString(
    "es-PE"
  );
  const fechaFinalStr = new Date(meta.fechaFinal).toLocaleDateString("es-PE");

  // Generar PDF usando jsPDF + html2canvas
  const handleGenerarPDF = async () => {
    try {
      setDescargando(true);

      // 1. Llamamos al backend para registrar/obtener el reporte
      await generarReporteMeta(meta.idMeta);

      // 2. Capturamos el contenedor
      const elemento = document.getElementById("contenedor-reporte-meta");
      if (!elemento) return;

      const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Reporte_${meta.nombre}.pdf`);
    } catch (err) {
      console.error("Error al generar reporte PDF:", err);
    } finally {
      setDescargando(false);
    }
  };

  return (
    <section className="detalle-meta">
      <div className="detalle-meta-toolbar">
        <button className="btn-volver" onClick={onVolver}>
          ⬅ Volver a mis metas
        </button>
      </div>

      <div id="contenedor-reporte-meta" className="detalle-meta-contenido">
        <header className="detalle-meta-header">
          <h2>{meta.nombre}</h2>
          <p className="subtitulo">Resumen financiero de tu meta</p>

          <div className="barra-avance-wrapper">
            <div className="barra-avance-fondo">
              <div
                className="barra-avance-progreso"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <span className="barra-avance-label">
              {porcentaje.toFixed(1)}% completado
            </span>
          </div>
        </header>

        <div className="detalle-meta-graficos">
          <div className="grafico-card">
            <h3>Distribución del progreso</h3>
            {meta.montoObjetivo === 0 ? (
              <p className="texto-muted">
                Aún no hay datos para mostrar el avance.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={dataCircular}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={3}
                  >
                    <Cell key="avance" fill="#22c55e" />
                    <Cell key="restante" fill="#4b5563" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="grafico-card">
            <h3>Ingresos vs Gastos asociados</h3>
            {dataBarras.length === 0 ? (
              <p className="texto-muted">
                No hay transacciones asociadas a esta meta.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dataBarras}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ingresos" name="Ingresos" fill="#22c55e" />
                  <Bar dataKey="gastos" name="Gastos" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="detalle-meta-datos">
          <div>
            <h4>Monto actual</h4>
            <p className="dato-monto">
              S/ {meta.montoActual.toLocaleString("es-PE")}
            </p>

            <h4>Monto objetivo</h4>
            <p className="dato-monto">
              S/ {meta.montoObjetivo.toLocaleString("es-PE")}
            </p>
          </div>

          <div>
            <h4>Fecha inicio</h4>
            <p>{fechaInicialStr}</p>

            <h4>Fecha final estimada</h4>
            <p>{fechaFinalStr}</p>
          </div>
        </div>
      </div>

      <div className="detalle-meta-footer">
        <button
          className="btn-reporte"
          onClick={handleGenerarPDF}
          disabled={descargando}
        >
          {descargando ? "Generando reporte..." : "Crear reporte PDF"}
        </button>
      </div>
    </section>
  );
};
