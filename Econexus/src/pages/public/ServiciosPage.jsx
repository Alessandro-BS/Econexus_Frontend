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
        <div className="row g-5">
          {/* Tarjeta 1 */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <i className="bi bi-shield-check text-success fs-1 mb-3"></i>
              <h3 className="fw-bold text-dark">Gestión de Residuos</h3>
              <p className="text-muted">Implementamos planes de minimización de residuos sólidos industriales. Incluye recolección interna y transporte autorizado.</p>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 text-white bg-dark">
              <i className="bi bi-water text-success fs-1 mb-3"></i>
              <h3 className="fw-bold text-dark">Tratamiento de Aguas</h3>
              <p className="text-white-50">Análisis y tratamiento de efluentes. Diseñamos plantas de tratamiento (PTAR) a medida.</p>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <i className="bi bi-bug text-success fs-1 mb-3"></i>
              <h3 className="fw-bold text-dark">Saneamiento Industrial</h3>
              <p className="text-muted">Control integral de plagas y desinfección de ambientes con certificación sanitaria oficial.</p>
            </div>
          </div>
        </div>
        {/* Sección de Certificaciones y Compromiso */}
        <div className="mt-5 p-5 bg-light rounded-4 text-center border-top">
          <h4 className="fw-bold mb-4 text-dark">Certificaciones y Cumplimiento Normativo</h4>
          <p className="text-secondary mb-5 mx-auto" style={{ maxWidth: '800px' }}>
            En Econexus operamos bajo los más altos estándares internacionales, garantizando que cada proceso 
            respete el marco legal vigente y contribuya a la preservación del ecosistema.
          </p>
          <div className="d-flex justify-content-around flex-wrap gap-4">
            <div className="badge bg-white text-success p-3 shadow-sm border border-success-subtle flex-grow-1" style={{ minWidth: '150px' }}>
              <i className="bi bi-patch-check-fill me-2"></i> ISO 14001:2015
            </div>
            <div className="badge bg-white text-success p-3 shadow-sm border border-success-subtle flex-grow-1" style={{ minWidth: '150px' }}>
              <i className="bi bi-patch-check-fill me-2"></i> ISO 9001:2015
            </div>
            <div className="badge bg-white text-success p-3 shadow-sm border border-success-subtle flex-grow-1" style={{ minWidth: '150px' }}>
              <i className="bi bi-patch-check-fill me-2"></i> Ley N° 29783 (SST)
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiciosPage;