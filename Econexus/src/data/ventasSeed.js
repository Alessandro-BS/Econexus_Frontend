const ventasSeed = [
  { 
    id: 1, numero_orden: 'OS-2026-0001', 
    fecha_emision: '2026-04-10', 
    cliente_id: 1,
    cliente_nombre: 'Hospital Regional del Sur S.A.C.',
    monto_total: 1250.00, 
    estado_pago: 'PAGADO', 
    pdf_base64: null 
    },
  { 
    id: 2, numero_orden: 'OS-2026-0002',
    fecha_emision: '2026-04-12', 
    cliente_id: 2,
    cliente_nombre: 'Minera Los Andes S.A.', 
    monto_total: 3400.50, 
    estado_pago: 'PENDIENTE', 
    pdf_base64: null 
    },
  { 
    id: 3, numero_orden: 'OS-2026-0003', 
    fecha_emision: '2026-03-15', 
    cliente_id: 3, 
    cliente_nombre: 'Textilera Amazonia E.I.R.L.',
    monto_total: 850.00, 
    estado_pago: 'ANULADO',
    pdf_base64: null 
    },
  { 
    id: 4, numero_orden: 'OS-2026-0004',
    fecha_emision: '2026-01-18', 
    cliente_id: 7, 
    cliente_nombre: 'Constructora Edifica S.A.C.',
    monto_total: 4100.00,
    estado_pago: 'PENDIENTE', 
    pdf_base64: null 
    },
  { 
    id: 5, numero_orden: 'OS-2026-0005', 
    fecha_emision: '2026-04-20', 
    cliente_id: 5, 
    cliente_nombre: 'Alimentos Procesados Lima S.A.',
    monto_total: 1200.00, 
    estado_pago: 'PAGADO', 
    pdf_base64: null 
    },
  { 
    id: 6, numero_orden: 'OS-2026-0006', 
    fecha_emision: '2025-11-22',
    cliente_id: 9,
    cliente_nombre: 'Laboratorios Farmacéuticos BioSalud', 
    monto_total: 2800.00, 
    estado_pago: 'PENDIENTE', 
    pdf_base64: null 
    },
  {
    id: 7, numero_orden: 'OS-2026-0007',
     fecha_emision: '2026-02-23', 
     cliente_id: 2, 
     cliente_nombre: 'Minera Los Andes S.A.',
      monto_total: 5600.00, 
      estado_pago: 'PAGADO',
       pdf_base64: null 
    },
  { 
    id: 8, numero_orden: 'OS-2026-0008',
    fecha_emision: '2026-04-24',
    cliente_id: 10, 
    cliente_nombre: 'Hotel Paraíso del Sur S.A.C.', 
    monto_total: 950.00, 
    estado_pago: 'PENDIENTE', 
    pdf_base64: null 
    },
  { 
    id: 9, numero_orden: 'OS-2026-0009',
    fecha_emision: '2025-12-25', 
    cliente_id: 6, 
    cliente_nombre: 'Clínica San Juan Bautista', 
    monto_total: 1750.00,
    estado_pago: 'PAGADO', 
    pdf_base64: null 
    },
  { 
    id: 10, numero_orden: 'OS-2026-0010',
    fecha_emision: '2026-04-26', 
    cliente_id: 4, 
    cliente_nombre: 'Agropecuaria Valle Verde S.A.C.', 
    monto_total: 3200.00,
    estado_pago: 'PENDIENTE', 
    pdf_base64: null
    }
];
export default ventasSeed;