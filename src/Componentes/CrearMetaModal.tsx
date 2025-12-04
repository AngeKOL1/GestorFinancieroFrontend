// src/Componentes/CrearMetaModal.tsx
import React, { useEffect, useState } from "react";
import "./Styles/ModalMeta.css";
import type { CrearMetaDTO } from "../dto/CrearMetaDTO";

import {
  getCategorias,
  getTipoMetas,
  getEstadoMetas,
} from "../service/CategoriasService";

import {
  getMisCategorias,
  crearMiCategoria,
} from "../service/MisCategoriasService";
import type { VerMisCategoriasDTO } from "../dto/VerMisCategoriasDTO";

interface ModalMetaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CrearMetaDTO) => void;
}

type ModoCategoria = "global" | "mis";

export const ModalMeta: React.FC<ModalMetaProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const [categorias, setCategorias] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [estados, setEstados] = useState<any[]>([]);

  const [modoCategoria, setModoCategoria] = useState<ModoCategoria>("global");
  const [misCategorias, setMisCategorias] = useState<VerMisCategoriasDTO[]>([]);
  const [showNuevaCategoria, setShowNuevaCategoria] = useState(false);

  const [nuevaCatNombre, setNuevaCatNombre] = useState("");
  const [nuevaCatDescripcion, setNuevaCatDescripcion] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      const cat = await getCategorias();
      const tip = await getTipoMetas();
      const est = await getEstadoMetas();

      setCategorias(cat);
      setTipos(tip);
      setEstados(est);
    };

    const cargarMisCategorias = async () => {
      const mias = await getMisCategorias();
      setMisCategorias(mias);
    };

    cargarDatos();
    cargarMisCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    // valores base
    const nombre = String(f.get("nombre") || "");
    const montoObjetivo = Number(f.get("montoObjetivo") || 0);
    const fechaFinal = String(f.get("fechaFinal") || "");

    // categoría según modo
    let nombreCategoria: string | null = null;
    let nombreMisCategoria: string | null = null;

    if (modoCategoria === "global") {
      nombreCategoria = String(f.get("categoria") || "") || null;
    } else {
      nombreMisCategoria = String(f.get("miCategoria") || "") || null;
    }

    const meta: CrearMetaDTO = {
      nombre,
      montoObjetivo,
      fechaFinal,
      nombreCategoria,
      nombreMisCategoria,
      nombreTipoMeta: String(f.get("tipoMeta") || "") || null,
      nombreEstadoMeta: String(f.get("estadoMeta") || "") || null,
    };

    try {
      await onSubmit(meta);
      onClose();
    } catch (err) {
      console.error("Error al crear meta:", err);
    }
  };

  const handleCrearMiCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaCatNombre.trim()) return;

    try {
      await crearMiCategoria({
        nombre: nuevaCatNombre,
        descripcion: nuevaCatDescripcion,
        estado: true,
      });

      // refrescar lista
      const mias = await getMisCategorias();
      setMisCategorias(mias);

      // limpiar y cerrar mini-modal
      setNuevaCatNombre("");
      setNuevaCatDescripcion("");
      setShowNuevaCategoria(false);
    } catch (err) {
      console.error("Error al crear mi categoría:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <div className="modal-content">
          {/* IZQUIERDA: FORM META */}
          <form className="modal-form" onSubmit={handleSubmit}>
            <h2>Nueva Meta 🎯</h2>

            <label>Nombre de la meta</label>
            <input name="nombre" type="text" required />

            <label>Monto objetivo</label>
            <input name="montoObjetivo" type="number" required />

            <label>Fecha límite</label>
            <input name="fechaFinal" type="date" required />

            <div className="categoria-switch">
              <span
                className={
                  "switch-pill " +
                  (modoCategoria === "global" ? "activo" : "")
                }
                onClick={() => setModoCategoria("global")}
              >
                Categoría
              </span>
              <span
                className={
                  "switch-pill " + (modoCategoria === "mis" ? "activo" : "")
                }
                onClick={() => setModoCategoria("mis")}
              >
                Mis Categorías
              </span>
            </div>

            {modoCategoria === "global" ? (
              <>
                <label>Categoría</label>
                <select name="categoria" required>
                  <option value="">Seleccione...</option>
                  {categorias.map((c) => (
                    <option
                      key={c.idCategoriaMeta}
                      value={c.nombreCategoria}
                    >
                      {c.nombreCategoria}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <div className="mis-categorias-header">
                  <label>Mis categorías</label>
                  <button
                    type="button"
                    className="btn-mini"
                    onClick={() => setShowNuevaCategoria(true)}
                  >
                    + Nueva
                  </button>
                </div>

                <select name="miCategoria" required>
                  <option value="">Seleccione...</option>
                  {misCategorias.map((m) => (
                    <option key={m.nombre} value={m.nombre}>
                      {m.nombre}
                    </option>
                  ))}
                </select>
              </>
            )}

            <label>Tipo de Meta</label>
            <select name="tipoMeta" required>
              <option value="">Seleccione...</option>
              {tipos.map((t) => (
                <option key={t.idTipoMeta} value={t.nombreTipoMeta}>
                  {t.nombreTipoMeta}
                </option>
              ))}
            </select>

            <label>Estado inicial</label>
            <select name="estadoMeta" required>
              <option value="">Seleccione...</option>
              {estados.map((e) => (
                <option key={e.idEstadoMeta} value={e.nombreEstadoMeta}>
                  {e.nombreEstadoMeta}
                </option>
              ))}
            </select>

            <button className="btn-guardar" type="submit">
              Guardar Meta
            </button>
          </form>

          {/* DERECHA: GIF / IMAGEN */}
          <div className="modal-aside">
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmVmN2Y2ZWU4MDhjNGU4ZTFjYWUwZmJhYjc0OGM1MjRkOGFhMTUyNyZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif"
              alt="Asistente creando metas"
            />
          </div>
        </div>

        {/* MINI MODAL PARA NUEVA CATEGORÍA */}
        {showNuevaCategoria && (
          <div className="mini-modal-overlay">
            <div className="mini-modal">
              <h3>Nueva categoría personal</h3>
              <form onSubmit={handleCrearMiCategoria}>
                <label>Nombre</label>
                <input
                  type="text"
                  value={nuevaCatNombre}
                  onChange={(e) => setNuevaCatNombre(e.target.value)}
                  required
                />

                <label>Descripción (opcional)</label>
                <textarea
                  value={nuevaCatDescripcion}
                  onChange={(e) => setNuevaCatDescripcion(e.target.value)}
                  rows={3}
                />

                <div className="mini-modal-actions">
                  <button
                    type="button"
                    className="btn-mini cancelar"
                    onClick={() => setShowNuevaCategoria(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-mini confirmar">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};