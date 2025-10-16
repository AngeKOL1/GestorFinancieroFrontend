import React from 'react'

export const MetasLateral = () => {
  return (
      <aside className="barraCreacionYListado">
          <button className="crearMeta">+</button>

          <div className="filtracionMetas">
            <h3>Filtrar por</h3>
            <button>Tipo</button>
            <button>Alta-Baja</button>
            <button>Prioridad</button>
          </div>

          <div className="listarMetasGeneral">
            <div className="metaLateral">
              <div className="dato nombre">Comprar laptop</div>
              <div className="dato monto">S/ 500</div>
            </div>
            <div className="metaLateral">
              <div className="dato nombre">Gimnasio</div>
              <div className="dato monto">S/ 800</div>
            </div>
          </div>
      </aside>
  )
}
