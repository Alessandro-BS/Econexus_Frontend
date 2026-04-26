const reportesSeed = [
  { id: 1, cliente_id: 1, tipo_servicio_id: 1, estado_cumplimiento: 'CUMPLIDO' },
  { id: 2, cliente_id: 2, tipo_servicio_id: 2, estado_cumplimiento: 'CUMPLIDO' },
  { id: 3, cliente_id: 3, tipo_servicio_id: 3, estado_cumplimiento: 'EN_PROCESO' },
  { id: 4, cliente_id: 1, tipo_servicio_id: 4, estado_cumplimiento: 'PENDIENTE' },
  { id: 5, cliente_id: 4, tipo_servicio_id: 1, estado_cumplimiento: 'CUMPLIDO' },
  { id: 6, cliente_id: 5, tipo_servicio_id: 5, estado_cumplimiento: 'OBSERVADO' },
  { id: 7, cliente_id: 2, tipo_servicio_id: 2, estado_cumplimiento: 'PENDIENTE' },
  { id: 8, cliente_id: 3, tipo_servicio_id: 1, estado_cumplimiento: 'EN_PROCESO' },
];
export default reportesSeed;