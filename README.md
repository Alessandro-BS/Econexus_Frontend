# Econexus - Sistema de Gestión de Saneamiento Ambiental 🌱

Econexus es una plataforma integral desarrollada en **React + Vite** diseñada para administrar, monitorear y optimizar los procesos de una empresa enfocada en servicios de saneamiento ambiental (Fumigación, Desinsectación, Manejo de Residuos Sólidos y Líquidos).

## 🚀 Tecnologías y Stack

- **Frontend Core:** React 18, Vite
- **Enrutamiento:** React Router DOM v6
- **Estilos y UI:** CSS Vanilla (Custom Properties, BEM-like), Bootstrap 5 (Grid & Modals), Bootstrap Icons
- **Visualización de Datos:** Recharts (Gráficos interactivos)
- **Persistencia de Datos:** `localStorage` (Implementado vía custom hook `useLocalStorage` como Mock BD)

## ✨ Características Principales

1. **Dashboard Interactivo:**
   - Panel de control general con KPIs dinámicos (Montos Cobrados, Órdenes Generadas/Pendientes, Total de Clientes).
   - Gráficos en tiempo real (BarChart, PieChart) que reaccionan al estado global del sistema.

2. **Buscador Global Inteligente:**
   - Barra de búsqueda superior (`TopBar`) que indexa y busca simultáneamente en todos los módulos (Clientes, Proveedores, Ventas, Reportes).

3. **Módulos CRUD Completos:**
   Cada módulo incluye una tabla responsiva con paginación local, barra de búsqueda en tiempo real, KPIs propios de la sección y modales interactivos para las acciones de creación, edición y eliminación.
   - 👥 **Clientes:** Gestión de hospitales, mineras y empresas generadoras de residuos.
   - 🏭 **Proveedores:** Gestión de empresas que proveen EPPs, químicos, maquinaria y servicios logísticos.
   - 💼 **Ventas (Órdenes):** Control de ingresos, generación de órdenes de servicio y seguimiento de pagos.
   - 📊 **Reportes:** Trazabilidad de los servicios ejecutados, unidades de medida y estados de cumplimiento (Pendiente, En Proceso, Cumplido, Observado).
   - 🛡️ **Usuarios:** Administración de accesos y roles del sistema.
   - ⚖️ **Normativas:** Registro y verificación del cumplimiento legal ambiental.

4. **Diseño Premium y Responsivo:**
   - Animaciones fluidas (`animate-fade-in-up`), modales superpuestos, diseño de tarjetas con sombras suaves y una paleta de colores curada y profesional.
   - 100% adaptable a dispositivos móviles, tablets y escritorios.

## 📋 Requerimientos Funcionales
| # | Requerimiento |
|---|---------------|
| 1 | Gestión de clientes con creación, edición, búsqueda, eliminación y KPIs propios. |
| 2 | Gestión de proveedores con CRUD completo y métricas de abastecimiento. |
| 3 | Gestión de ventas/órdenes de servicio con seguimiento de pagos y estados. |
| 4 | Gestión de reportes y normativas ambientales con registro de cumplimiento. |
| 5 | Administración de usuarios y roles para acceso seguro a los módulos. |
| 6 | Dashboard interactivo con KPIs globales y gráficos dinámicos. |
| 7 | Búsqueda global en los distintos módulos para acceso rápido a la información. |
| 8 | Páginas públicas informativas: Landing, servicios, contacto, galería y catálogo. |

## ⚙️ Requerimientos No Funcionales
| # | Requerimiento |
|---|---------------|
| 1 | Interfaz responsiva y usable en dispositivos móviles, tablets y escritorios. |
| 2 | Rendimiento optimizado mediante React + Vite. |
| 3 | Persistencia local de datos usando `localStorage` como mock de base de datos. |
| 4 | Arquitectura modular y mantenible con componentes reutilizables. |
| 5 | Experiencia de usuario intuitiva con navegación clara y modales consistentes. |
| 6 | Diseño visual profesional con foco en legibilidad y usabilidad. |

## 📂 Estructura del Proyecto

```text
src/
├── assets/            # Imágenes, SVGs y recursos estáticos
├── components/        # Componentes agrupados por dominio
│   ├── auth/          # Login y flujos de autenticación
│   ├── clientes/      # Página, Tabla, Modal y KPIs de Clientes
│   ├── dashboard/     # Página principal, Gráficos y KPIs globales
│   ├── layout/        # Sidebar, TopBar y estructura maestra (Layout.jsx)
│   ├── normativas/    # Gestión legal
│   ├── proveedores/   # Gestión de suministros
│   ├── public/        # Landing Page pública
│   ├── reportes/      # Operaciones y trazabilidad
│   ├── usuarios/      # Roles y accesos
│   └── ventas/        # Órdenes de servicio
├── data/              # Archivos "Seed" con datos iniciales (Mock Data)
├── hooks/             # Custom hooks (ej. useLocalStorage)
├── App.jsx            # Enrutador principal y definición de rutas (Públicas/Privadas)
├── index.css          # Estilos globales, variables CSS y animaciones base
└── main.jsx           # Punto de entrada de React
```

## 🛠️ Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd Econexus
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *El proyecto estará disponible por defecto en `http://localhost:5173/`.*

## 💾 Sobre la Base de Datos (Persistencia Local)
Actualmente, el proyecto funciona sin un backend externo. Toda la información se persiste en la memoria del navegador usando `localStorage`. Si deseas reiniciar la base de datos a su estado original (10 registros por módulo), simplemente limpia la caché de tu navegador (Application -> Local Storage) o elimina las llaves que empiezan con `eco_` y recarga la página.

## 👥 Próximos Pasos
- Integración de los servicios y vistas con un backend real (Spring Boot).
- Migración de `useLocalStorage` a funciones `fetch` nativas o `axios`.
- Implementación de autenticación real basada en JWT.
