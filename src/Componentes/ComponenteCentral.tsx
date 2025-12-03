import React from "react";
import { ListarMetas } from "./ListarMetas";
import { GridTrofeos } from "./GridTrofeos";

interface ComponenteCentralProps {
  mostrarTrofeos: boolean;
  onVerMetas?: () => void;
}

export const ComponenteCentral: React.FC<ComponenteCentralProps> = ({
  mostrarTrofeos,
  onVerMetas,
}) => {
  return (
    <section className="contenidoPrincipal">
      <div className="logotipo">
        <h1>GGestor</h1>
        <p>{mostrarTrofeos ? "Tus trofeos" : "Resumen de tus metas"}</p>
        <div className="btnsMorP">
          <button onClick={onVerMetas}>Metas</button>
          <button>Presupuestos</button>
        </div>
      </div>
      {mostrarTrofeos ? <GridTrofeos /> : <ListarMetas />}
    </section>
  );
};
