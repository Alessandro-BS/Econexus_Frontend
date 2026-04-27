/**
 * Datos semilla de normativas para inicializar localStorage.
 * Estructura alineada con la tabla `normativas` de la base de datos.
 */
const normativasSeed = [
  {
    id: 1,
    codigo: 'DS N° 013-2017-MINAM',
    titulo: 'Reglamento de Gestión de Residuos Sólidos',
    descripcion:
      'Marco legal para la gestión integral de residuos sólidos aplicable a autoridades, empresas y municipios.',
    fecha_publicacion: '2017-05-25',
    entidad_emisora: 'MINAM',
    url_documento:
      'https://www.gob.pe/institucion/minam/normas-legales/013-2017-minam',
    estado: 'VIGENTE',
  },
  {
    id: 2,
    codigo: 'RM N° 075-2016-MINAM',
    titulo: 'Normas Técnicas para Clasificación de Residuos',
    descripcion:
      'Establece los criterios técnicos para la clasificación y manejo de residuos peligrosos y no peligrosos.',
    fecha_publicacion: '2016-10-12',
    entidad_emisora: 'MINAM',
    url_documento:
      'https://www.gob.pe/institucion/minam/normas-legales/075-2016-minam',
    estado: 'VIGENTE',
  },
  {
    id: 3,
    codigo: 'D.S. N° 003-2011-SA',
    titulo: 'Reglamento de Gestión de Residuos Sólidos en Salud',
    descripcion:
      'Reglamento sanitario para la gestión de residuos sólidos en instalaciones y servicios de salud.',
    fecha_publicacion: '2011-02-15',
    entidad_emisora: 'DIGESA',
    url_documento:
      'https://www.gob.pe/institucion/digesa/normas-legales/003-2011-sa',
    estado: 'VIGENTE',
  },
  {
    id: 4,
    codigo: 'RCD N° 032-2018-OEFA',
    titulo: 'Lineamientos de Supervisión Ambiental',
    descripcion:
      'Lineamientos para la supervisión y fiscalización del cumplimiento ambiental en el sector saneamiento.',
    fecha_publicacion: '2018-11-20',
    entidad_emisora: 'OEFA',
    url_documento:
      'https://www.oefa.gob.pe/normatividad/032-2018-oefa',
    estado: 'VIGENTE',
  },
  {
    id: 5,
    codigo: 'RM N° 005-2019-DIGESA',
    titulo: 'Protocolos de Autorización Sanitaria',
    descripcion:
      'Define los requisitos y procedimientos de autorización sanitaria para servicios ambientales y equipos de control.',
    fecha_publicacion: '2019-03-05',
    entidad_emisora: 'DIGESA',
    url_documento:
      'https://www.gob.pe/institucion/digesa/normas-legales/005-2019-digesa',
    estado: 'VIGENTE',
  },
];

export default normativasSeed;
