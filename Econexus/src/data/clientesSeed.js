/**
 * Datos semilla de clientes para inicializar localStorage.
 * Estructura alineada con la tabla `clientes` de la BD MySQL.
 */
const clientesSeed = [
  {
    id: 1,
    razon_social: 'Industrias Químicas del Perú S.A.C.',
    ruc: '20501234567',
    contacto_principal: 'Carlos Mendoza Torres',
    telefono: '01-4567890',
    email: 'cmendoza@iqperu.com.pe',
    direccion: 'Av. Argentina 2850, Callao, Lima',
    estado: 'ACTIVO'
  },
  {
    id: 2,
    razon_social: 'Minera Horizonte Dorado S.A.',
    ruc: '20609876543',
    contacto_principal: 'María Elena Quispe',
    telefono: '064-523456',
    email: 'mquispe@horizontedorado.com',
    direccion: 'Jr. Huancavelica 320, Huancayo, Junín',
    estado: 'ACTIVO'
  },
  {
    id: 3,
    razon_social: 'Pesquera Oceánica del Sur E.I.R.L.',
    ruc: '20301456789',
    contacto_principal: 'Roberto Castañeda',
    telefono: '054-234567',
    email: 'rcastaneda@oceanicasur.pe',
    direccion: 'Calle Muelle 145, Ilo, Moquegua',
    estado: 'ACTIVO'
  },
  {
    id: 4,
    razon_social: 'Constructora Andes Verdes S.A.C.',
    ruc: '20456789012',
    contacto_principal: 'Ana Lucía Paredes',
    telefono: '01-3456789',
    email: 'aparedes@andesverdes.com.pe',
    direccion: 'Av. Javier Prado Este 1234, San Isidro, Lima',
    estado: 'INACTIVO'
  },
  {
    id: 5,
    razon_social: 'Agroindustrial Valle Norte S.A.',
    ruc: '20567890123',
    contacto_principal: 'Fernando Díaz Ramos',
    telefono: '044-567890',
    email: 'fdiaz@vallenorte.com',
    direccion: 'Av. Mansiche 890, Trujillo, La Libertad',
    estado: 'ACTIVO'
  },
  {
    id: 6,
    razon_social: 'Textiles Amazonia E.I.R.L.',
    ruc: '20678901234',
    contacto_principal: 'Lucía Fernández',
    telefono: '065-345678',
    email: 'lfernandez@textilamazonia.pe',
    direccion: 'Jr. Próspero 567, Iquitos, Loreto',
    estado: 'ACTIVO'
  },
  {
    id: 7,
    razon_social: 'Procesadora de Alimentos Sur S.A.C.',
    ruc: '20789012345',
    contacto_principal: 'Jorge Gutiérrez Luna',
    telefono: '054-456789',
    email: 'jgutierrez@proalsur.com.pe',
    direccion: 'Parque Industrial Rio Seco, Arequipa',
    estado: 'ACTIVO'
  },
  {
    id: 8,
    razon_social: 'Laboratorios BioClean Perú S.A.',
    ruc: '20890123456',
    contacto_principal: 'Diana Morales Vega',
    telefono: '01-5678901',
    email: 'dmorales@biocleanperu.com',
    direccion: 'Av. La Marina 2500, San Miguel, Lima',
    estado: 'INACTIVO'
  }
];

export default clientesSeed;
