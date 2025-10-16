import React from 'react'

export const Transacciones = () => {
  return (
        <aside className="despliegueMeta">
          <div className="graficosMetas"></div>

          <div className="infoMeta">
            <textarea placeholder="Descripción meta..." readOnly></textarea>

            <h3 className="tituloTransacciones">Transacciones recientes</h3>
            <div className="ingresos-gastos">
              <div className="transacciones">
                <div className="dato monto">S/ 1,500</div>
                <div className="dato tipo ingreso">Ingreso</div>
              </div>

              <div className="transacciones">
                <div className="dato monto">S/ 250</div>
                <div className="dato tipo gasto">Gasto</div>
              </div>

              <div className="transacciones">
                <div className="dato monto">S/ 800</div>
                <div className="dato tipo ingreso">Ingreso</div>
              </div>

              <div className="transacciones">
                <div className="dato monto">S/ 120</div>
                <div className="dato tipo gasto">Gasto</div>
              </div>
            </div>
          </div>
        </aside>

  )
}
