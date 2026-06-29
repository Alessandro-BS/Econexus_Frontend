# Econexus Frontend - Saneamiento Ambiental 🌱

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel&logoColor=white)

Econexus es una plataforma web (Single Page Application) corporativa desarrollada en **React + Vite** para la administración, monitoreo y optimización operativa de servicios de saneamiento ambiental (Fumigación, Desinsectación, Manejo de Residuos Sólidos y Líquidos).

> 🔗 **Frontend (App):** [Live Demo en Vercel](https://econexus-frontend.vercel.app)
> 🔗 **Backend (API):** [Repositorio de la API Spring Boot](https://github.com/Alessandro-BS/Econexus-Backend)

---

## 🚀 Arquitectura y Tecnologías Core

El frontend está construido con enfoque en componentes modulares, alto rendimiento y una interfaz de usuario fluida sin depender de librerías UI pesadas.

- **Framework:** React 18 (Hooks funcionales, Context API)
- **Build Tool:** Vite (HMR ultra-rápido, build optimizado)
- **Enrutamiento:** React Router DOM v6 (Rutas protegidas y anidadas)
- **Estilos:** CSS Vanilla (Metodología BEM, Custom Properties, CSS Modules) + Bootstrap 5 (Exclusivo para Grid System y utilidades)
- **Visualización de Datos:** Recharts (SVG Charts dinámicos e interactivos)
- **Gestión de Estado/Datos:** Integración con REST API (o persistencia en `localStorage` como fallback/mock para desarrollo)

---

## ✨ Módulos y Características

El sistema consta de interfaces CRUD avanzadas e interactivas, diseñadas con un alto estándar de usabilidad (UX/UI):

1. **📊 Dashboard Analítico:** 
   Panel de control global con métricas clave (Montos Cobrados, Órdenes, Clientes). Incluye gráficos (BarChart, PieChart) renderizados en tiempo real mediante `Recharts`.
2. **🔍 Motor de Búsqueda Global:** 
   Un componente de búsqueda unificado capaz de indexar y recuperar registros de cualquier módulo de forma instantánea.
3. **👥 Clientes & 🏭 Proveedores:** 
   Gestión del ciclo de vida de entidades corporativas (hospitales, mineras). Modales interactivos para inserción y actualización de datos.
4. **💼 Órdenes de Servicio (Ventas):** 
   Trazabilidad de la facturación y seguimiento de pagos según tipo de residuo/servicio.
5. **🛡️ Seguridad & Accesos (Usuarios):** 
   Vistas protegidas (`ProtectedRoutes`), manejo de sesión y roles (Administrador, Supervisor, Operador).

---

## 📋 Requerimientos del Sistema

### Requerimientos Funcionales (RF)
- **RF01** - **Seguridad** - Autenticación de usuarios y protección de rutas según roles (Administrador, Supervisor, Operador).
- **RF02** - **Dashboard** - Visualización en tiempo real de métricas clave (montos cobrados, órdenes, clientes) mediante gráficos interactivos.
- **RF03** - **Clientes** - Creación, lectura, actualización y eliminación (CRUD) de clientes corporativos mediante modales interactivos.
- **RF04** - **Proveedores** - Creación, lectura, actualización y eliminación (CRUD) de empresas proveedoras.
- **RF05** - **Usuarios** - Creación, lectura, actualización y eliminación (CRUD) de cuentas de usuario y asignación de accesos al sistema.
- **RF06** - **Órdenes de Servicio** - Creación, lectura, actualización y eliminación (CRUD) de órdenes, seguimiento de pagos y trazabilidad de facturación.
- **RF07** - **Búsqueda Global** - Indexación y recuperación instantánea de registros desde cualquier módulo del sistema.
- **RF08** - **Integración** - Consumo de servicios RESTful (Spring Boot) para persistencia y fallback a `localStorage` en entornos de prueba.

### Requerimientos No Funcionales (RNF)
- **RNF01** - **UX/UI** - Interfaz premium y moderna utilizando Glassmorphism, micro-interacciones fluidas y diseño *Mobile-First*.
- **RNF02** - **Rendimiento** - Tiempos de carga mínimos y renderizado eficiente gracias a React 18 y Vite.
- **RNF03** - **Responsividad** - Adaptabilidad total a móviles, tablets y escritorio (Sidebar tipo Offcanvas, tablas colapsables).
- **RNF04** - **Arquitectura** - Código estructurado por dominios/features (modular) y estilos organizados con CSS Vanilla (BEM).
- **RNF05** - **Seguridad Frontend** - Manejo seguro de sesión, ocultamiento de componentes por permisos y bloqueo de rutas no autorizadas (`ProtectedRoutes`).
- **RNF06** - **Compatibilidad** - Soporte garantizado para los navegadores web modernos estándar (Chrome, Edge, Safari, Firefox).

---

## 📂 Estructura del Proyecto

El código fuente sigue una arquitectura por dominios/features para facilitar la escalabilidad.

```text
src/
├── assets/            # Recursos estáticos optimizados (SVGs, WebP)
├── components/        # Componentes funcionales aislados
│   ├── auth/          # Login, AuthProvider, Contextos de seguridad
│   ├── layout/        # Estructura maestra: Sidebar, TopBar, Wrapper
│   ├── dashboard/     # Tarjetas de KPIs, Contenedores de Gráficos
│   ├── clientes/      # Vistas, Tablas y Modales de empresas contratantes
│   ├── ventas/        # Gestión de órdenes y facturación
│   ├── proveedores/   # Módulo de empresas proveedoras
│   ├── reportes/      # Trazabilidad de cumplimiento
│   ├── normativas/    # Marco legal aplicable
│   ├── usuarios/      # Roles y acceso al sistema
│   └── common/        # Componentes compartidos y utilidades
├── hooks/             # Custom Hooks (ej. useFetch, useAuth, useLocalStorage)
├── data/              # Constantes y mocks de desarrollo
├── index.css          # Variables globales (Design System), animaciones (Keyframes)
├── App.jsx            # Configuración de Router y Providers
└── main.jsx           # Entry point (createRoot)
```

---

## 🛠️ Despliegue y Desarrollo Local

### Prerrequisitos
- **Node.js** (v18 o superior)
- **NPM** o **Yarn**

### 1. Clonar el repositorio
```bash
git clone https://github.com/Alessandro-BS/Econexus_Frontend.git
cd Econexus_Frontend
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto para apuntar al backend:
```env
VITE_API_URL=http://localhost:8080/api
```
*(Si no se detecta backend, la app cuenta con un sistema de fallback a `localStorage` para demostraciones).*

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Levantar Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`. 
Gracias a Vite, cualquier cambio en el código se reflejará instantáneamente (HMR).

### 5. Compilar para Producción
```bash
npm run build
```
Generará un bundle optimizado, minificado y listo para producción en la carpeta `/dist`.

---

## 💎 Diseño UI / UX Premium

- **Micro-interacciones:** Animaciones fluidas al renderizar listas (`animate-fade-in-up`), estados `:hover` pulidos en botones y tarjetas.
- **Accesibilidad y Responsividad:** Diseño *Mobile-First*. El `Sidebar` se convierte en un menú *Offcanvas* en dispositivos móviles, y las tablas colapsan inteligentemente.
- **Glassmorphism & Sombras:** Uso moderno de paletas de color, desenfoques (`backdrop-filter`) y sombras profundas para elevar el nivel visual corporativo.

---

## 👥 Equipo de Desarrollo

Proyecto desarrollado como parte de la infraestructura integral para gestión ambiental, conectado a su contraparte backend.
