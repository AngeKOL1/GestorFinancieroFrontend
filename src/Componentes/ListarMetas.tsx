import React, { useEffect, useState } from "react";
import { getMisMetas } from "../Service/MetaService";
import type { Meta } from "../Modelos/Meta";

export const ListarMetas = () => {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        const data = await getMisMetas();
        setMetas(data);
      } catch (error) {
        console.error("Error al obtener las metas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetas();
  }, []);

  if (loading) {
    return <p>Cargando metas...</p>;
  }

  return (
    <section className="contenidoPrincipal">
      <div className="logotipo">
        <h1>GGestor</h1>
        <p>Resumen de tus metas</p>
      </div>

      <div className="mostramosMetas">
        {metas.length === 0 ? (
          <p>No tienes metas registradas aún.</p>
        ) : (
          metas.map((meta) => (
            <div className="meta" key={meta.idMeta}>
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
                  <button className="btn-editar">Editar</button>
                  <button className="btn-eliminar">Eliminar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
