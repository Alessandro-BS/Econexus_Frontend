import React from 'react';
import { Link } from 'react-router-dom';

const ServiciosPage = () => {
  return (
    <div className="servicios-detalle">
      {/* Navegación superior */}
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="btn btn-outline-success rounded-pill px-4">
            ← Volver al Inicio
          </Link>
          <span className="fw-bold text-success">Econexus | Servicios Especializados</span>
        </div>
      </nav>

      {/* Cabecera principal */}
      <header className="bg-success text-white py-5 text-center shadow-sm">
        <div className="container">
          <h1 className="display-4 fw-bold">Nuestro Portafolio de Soluciones</h1>
          <p className="lead">Comprometidos con la excelencia operativa y el marco legal ambiental.</p>
        </div>
      </header>

      <main className="container py-5">
        {/* Aquí irán las tarjetas en el siguiente paso */}
      </main>
    </div>
  );
};

export default ServiciosPage;