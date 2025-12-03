import { GridTrofeos } from "./GridTrofeos";
import { ListarMetas } from "./ListarMetas";
import { ModalEditarMeta } from "./ModalEditarMeta";
import { ModalEliminarMeta } from "./ModalEliminarMeta";
import { useMetasContext } from "../hooks/MetasContext";
import { useTrofeos } from "../hooks/TrofeosContext";
import { useState } from "react";

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

  const [metaSeleccionada, setMetaSeleccionada] = useState<any>(null);
  const [editarAbierto, setEditarAbierto] = useState(false);
  const [eliminarAbierto, setEliminarAbierto] = useState(false);

  const abrirEditar = (idMeta: number) => {
    const meta = metas.find((m) => m.idMeta === idMeta);
    setMetaSeleccionada(meta);
    setEditarAbierto(true);
  };

  const abrirEliminar = (idMeta: number, nombre: string) => {
    const meta = metas.find((m) => m.idMeta === idMeta);
    setMetaSeleccionada(meta);
    setEliminarAbierto(true);
  };

  return (
    <section className="contenidoPrincipal">
      <div className="logotipo">
        <h1>GGestor</h1>
        <p>Resumen de tus metas</p>

       <div className="btnsMorP">
        <button 
          className={mostrarTrofeos ? "" : "active"}
          onClick={onVerMetas}
        >
          Metas
        </button>

        <button className={mostrarTrofeos ? "active" : ""}>
          Presupuestos
        </button>
      </div>

      </div>

      {mostrarTrofeos ? (
        <GridTrofeos />
      ) : (
        <ListarMetas
          busqueda={busqueda}
          onEditar={abrirEditar}
          onEliminar={abrirEliminar}
        />
      )}

      {editarAbierto && metaSeleccionada && (
        <ModalEditarMeta
          meta={metaSeleccionada}
          onClose={() => setEditarAbierto(false)}
        />
      )}

      {eliminarAbierto && metaSeleccionada && (
        <ModalEliminarMeta
          meta={metaSeleccionada}
          onClose={() => setEliminarAbierto(false)}
        />
      )}
    </section>
  );
};
