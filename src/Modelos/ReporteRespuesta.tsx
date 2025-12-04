export interface ReporteRespuesta {
  idReporte: number;
  tipo: string;
  fechaGeneracion: string;
  titulo: string;
  descripcion: string;
  montoActual: number;
  montoObjetivo: number;
  porcentajeAvance: number;
  fechaInicio: string;
  fechaFin: string;
  fechaCumplimientoMeta: string | null;
  estadoMeta: string;
  categoriaMeta: string;
  tipoMeta: string;
  observaciones: string;
}