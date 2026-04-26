/**
 * Datos semilla de usuarios para inicializar localStorage.
 * Estructura alineada con la tabla `usuarios` de la BD MySQL.
 */
const usuariosSeed = [
  {
    id: 1,
    nombre_completo: 'Juan Rodríguez García',
    email: 'jrodriguez@econexus.com.pe',
    telefono: '01-9876543',
    rol: 'ADMIN',
    estado: 'ACTIVO',
    fecha_creacion: '2025-01-15',
    password: '123456' // Solo para test, en producción no guardar passwords en localStorage
  },
  {
    id: 2,
    nombre_completo: 'María López Martínez',
    email: 'mlopez@econexus.com.pe',
    telefono: '01-8765432',
    rol: 'SUPERVISOR',
    estado: 'ACTIVO',
    fecha_creacion: '2025-02-10',
    password: '123456'
  },
  {
    id: 3,
    nombre_completo: 'Roberto Pérez Soto',
    email: 'rperez@econexus.com.pe',
    telefono: '01-7654321',
    rol: 'OPERADOR',
    estado: 'ACTIVO',
    fecha_creacion: '2025-02-20',
    password: '123456'
  },
  {
    id: 4,
    nombre_completo: 'Laura Castillo Flores',
    email: 'lcastillo@econexus.com.pe',
    telefono: '01-6543210',
    rol: 'SUPERVISOR',
    estado: 'INACTIVO',
    fecha_creacion: '2025-03-05',
    password: '123456'
  },
  {
    id: 5,
    nombre_completo: 'Carlos Hernández Ruiz',
    email: 'chernandez@econexus.com.pe',
    telefono: '01-5432109',
    rol: 'OPERADOR',
    estado: 'ACTIVO',
    fecha_creacion: '2025-03-12',
    password: '123456'
  }
];

export default usuariosSeed;
