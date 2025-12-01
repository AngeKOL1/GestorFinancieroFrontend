import React, { useState } from 'react';
import { ModalMeta } from './CrearMetaModal';
import { crearMeta } from '../service/MetaService';
import { useMetasContext } from '../hooks/MetasContext';  
import type { CrearMetaDTO } from '../dto/CrearMetaDTO';

export const MetasLateral = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { state, addMeta } = useMetasContext();  
  const { metas } = state;  

  const handleSubmit = async (data: CrearMetaDTO) => {
    const nuevaMeta = await crearMeta(data);
    addMeta(nuevaMeta);  
    setIsModalOpen(false);
  };

  return (
    <aside className="barraCreacionYListado">
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="crearMeta"
      >
        +
      </button>

      <ModalMeta
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <div className="filtracionMetas">
        <h3>Filtrar por</h3>
        <button>Tipo</button>
        <button>Alta-Baja</button>
        <button>Prioridad</button>
      </div>
      <div className="listarMetasGeneral">
        {metas.length === 0 ? (
          <p>No hay metas aún</p>
        ) : (
          metas.map(meta => (
            <div className="metaLateral" key={meta.idMeta}>
              <div className="dato nombre">{meta.nombre}</div>
              <div className="dato monto">
                S/ {meta.montoActual?.toLocaleString("es-PE") ?? 0}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
