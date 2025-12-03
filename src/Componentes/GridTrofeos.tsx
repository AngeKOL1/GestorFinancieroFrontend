import React from "react";
import { useTrofeos } from "../hooks/TrofeosContext";
import type { Trofeo } from "../modelos/Trofeos";

export const GridTrofeos: React.FC = () => {
  const { state, selectTrofeo } = useTrofeos();
  const { trofeos } = state;

  return (
    <div className="grid-trofeos">
      {trofeos.map((t: Trofeo) => (
        <div
          key={t.idTrofeo}
          className={`trofeo-item ${t.obtenido ? "obtenido" : "no-obtenido"}`}
          onClick={() => selectTrofeo(t)}
        >
          <img
            src="https://img.freepik.com/vector-gratis/estilo-trofeo-plano_78370-3222.jpg"
            alt={t.nombreTrofeo}
            className="trofeo-img"
          />

          <div className="trofeo-info">
            <h4 className="trofeo-nombre">{t.nombreTrofeo}</h4>

            <p className="trofeo-prereq">{t.prerequisito}</p>

            <span className="trofeo-xp">🏆 {t.xpRequerida} XP</span>
          </div>
        </div>
      ))}
    </div>
  );
};
