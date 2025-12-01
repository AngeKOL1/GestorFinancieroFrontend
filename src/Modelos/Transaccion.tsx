// src/modelos/Transaccion.ts
export interface Transaccion {
  idTransaccion: number;
  fechaTransaccion: string;
  descripcion: string;
  monto: number;
  tipoTransaccionId: number; 

  metaTransaccion?: {
    idMetaTransaccion: number;
  }[];
}
