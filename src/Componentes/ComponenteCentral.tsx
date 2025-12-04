import React, { useState } from "react";
import { GridTrofeos } from "./GridTrofeos";
import { ListarMetas } from "./ListarMetas";
import { VistaMetaDetalle } from "./VistaMetaDetalle";

import { ModalEditarMeta } from "./ModalEditarMeta";
import { ModalEliminarMeta } from "./ModalEliminarMeta";

import { useMetasContext } from "../hooks/MetasContext";

import type { Meta } from "../modelos/Meta";

interface Props {
  mostrarTrofeos: boolean;
  onVerMetas: () => void;
  busqueda: string;
}

export const ComponenteCentral: React.FC<Props> = ({
  mostrarTrofeos,
  onVerMetas,
  busqueda,
}) => {

  const { state } = useMetasContext();
  const { metas } = state;

  const [metaSeleccionada, setMetaSeleccionada] = useState<Meta | null>(null);
  const [metaEditar, setMetaEditar] = useState<Meta | null>(null);
  const [metaEliminar, setMetaEliminar] = useState<Meta | null>(null);

  const handleVerDetalle = (meta: Meta) => {
    setMetaSeleccionada(meta);
  };

  const handleVolverDeDetalle = () => {
    setMetaSeleccionada(null);
  };

  const findMeta = (idMeta: number): Meta | null => {
    return metas.find((m) => m.idMeta === idMeta) ?? null;
  };

  const handleEditar = (idMeta: number) => {
    const meta = findMeta(idMeta);
    if (meta) setMetaEditar(meta);
  };
  const handleEliminar = (idMeta: number) => {
    const meta = findMeta(idMeta);
    if (meta) setMetaEliminar(meta);
  };

  return (
    <section className="contenidoPrincipal">
      <div className="logotipo">
        <h1>GGestor</h1>
        <p>Resumen de tus metas</p>

        <div className="btnsMorP">
          <button onClick={onVerMetas}>Metas</button>
          <button>Presupuestos</button>
        </div>
      </div>

      {mostrarTrofeos ? (
        <GridTrofeos />
      ) : metaSeleccionada ? (
        <VistaMetaDetalle 
          meta={metaSeleccionada} 
          onVolver={handleVolverDeDetalle} 
        />
      ) : (
        <ListarMetas
          busqueda={busqueda}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
          onVerDetalle={handleVerDetalle}
        />
      )}

      {metaEditar && (
        <ModalEditarMeta
          meta={metaEditar}
          onClose={() => setMetaEditar(null)}
        />
      )}

      {metaEliminar && (
        <ModalEliminarMeta
          meta={metaEliminar}
          onClose={() => setMetaEliminar(null)}
        />
      )}
    </section>
  );
};
