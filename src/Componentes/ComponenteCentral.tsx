import React from 'react'
import { ListarMetas } from './ListarMetas'

export const ComponenteCentral = () => {
  return (
    <section className="contenidoPrincipal">
      <div className="logotipo">
        <h1>GGestor</h1>
        <p>Resumen de tus metas</p>
        <div className="btnsMorP">
          <button>Metas</button>
          <button>Presupuestos</button>
        </div>
      </div>
      <ListarMetas></ListarMetas>
    </section>    
  )
}
