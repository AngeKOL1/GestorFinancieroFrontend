export interface CrearTransaccionDTO {
  monto: number;
  descripcion: string;
  tipoTransaccionId: number;
  idMeta?: number | null;
  presupuestoId?: number | null;
}
