export interface FechaMeta {
  idFechaMeta: number;
  mes: number;
  dia: number;
  anio: number;
  fechaTotal: string;
}

export interface Meta {
  idMeta: number;
  nombre: string;
  montoActual: number;
  montoObjetivo: number;
  fechaInicial: string;
  fechaFinal: string;
  fechaMeta: FechaMeta;
  metaTransaccion: any[];
  presupuesto: any | null;
}
