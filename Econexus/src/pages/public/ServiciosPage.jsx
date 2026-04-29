import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServiciosPage.css';

const ServiciosPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => { setShowModal(false); setEnviado(false); }, 3000);
  };

  return (
    <div className="servicios-detalle bg-light">
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="btn btn-sm btn-outline-success rounded-pill px-3">
            <i className="bi bi-arrow-left me-1"></i> Volver al Inicio
          </Link>
          <span className="fw-bold text-success border-start ps-3 d-none d-md-inline">División de Ingeniería Ambiental</span>
        </div>
      </nav>

      <header className="hero-industrial text-white py-5 position-relative overflow-hidden">
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <span className="badge bg-success mb-2 px-3 py-2 text-uppercase tracking-wider">Operadora Autorizada</span>
          <h1 className="display-3 fw-bold mb-3">Gestión de Pasivos e <br/> Ingeniería Ambiental</h1>
          <p className="lead fs-4 opacity-75 w-75">
            Soluciones de alta complejidad para la continuidad operativa de sectores industriales estratégicos.
          </p>
        </div>
        <div className="icon-bg-overlay">
          <i className="bi bi-cone-striped"></i>
        </div>
      </header>

      <main className="container py-5">
        <h2 className="fw-bold h3 mb-5 text-center"><i className="bi bi-gear-wide-connected text-success me-2"></i>Especialidades Operativas</h2>
        
        <div className="row g-4 mb-5">
          {/* MATPEL */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm p-4 custom-card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <i className="bi bi-exclamation-triangle-fill text-warning fs-1"></i>
                <span className="badge bg-light text-dark border">Ley N° 1278</span>
              </div>
              <h4 className="fw-bold">Gestión MATPEL</h4>
              <p className="text-muted small">Manejo especializado de materiales peligrosos, incluyendo aceites usados, baterías, filtros y suelos contaminados por hidrocarburos.</p>
              <div className="mt-auto">
                <div className="p-2 bg-light rounded-3 mb-2 small">
                  <strong>Sectores:</strong> Minería y Energía
                </div>
                <div className="p-2 bg-light rounded-3 small">
                  <strong>Capacidad:</strong> Unidades de 15TN / 30TN
                </div>
              </div>
            </div>
          </div>

          {/* PTAR */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm p-4 bg-dark text-white custom-card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <i className="bi bi-droplet-fill text-primary fs-1"></i>
                <span className="badge bg-secondary text-white border-0">D.S. 010-2019</span>
              </div>
              <h4 className="fw-bold">Ingeniería de Aguas</h4>
              <p className="small opacity-75">Sistemas de tratamiento de efluentes industriales y purificación. Succión de lodos en pozos sépticos y limpieza de cisternas de alta capacidad.</p>
              <div className="mt-auto">
                <div className="p-2 bg-secondary bg-opacity-25 rounded-3 mb-2 small">
                  <strong>Sectores:</strong> Alimentaria y Pesca
                </div>
                <div className="p-2 bg-secondary bg-opacity-25 rounded-3 small">
                  <strong>Estándar:</strong> Cumplimiento LMP/ECA
                </div>
              </div>
            </div>
          </div>

          {/* Sanidad */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm p-4 custom-card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <i className="bi bi-shield-plus text-success fs-1"></i>
                <span className="badge bg-light text-dark border">NTS 144-MINSA</span>
              </div>
              <h4 className="fw-bold">Sanidad Hospitalaria</h4>
              <p className="text-muted small">Protocolos de desinfección de alto nivel, desinsectación y control de plagas con productos biodegradables Grado III autorizados por DIGESA.</p>
              <div className="mt-auto">
                <div className="p-2 bg-light rounded-3 mb-2 small">
                  <strong>Sectores:</strong> Centros de Salud y Retail
                </div>
                <div className="p-2 bg-light rounded-3 small">
                  <strong>Documento:</strong> Certificado Sanitario Oficial
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-success text-white py-5 footer-cta">
        <div className="container text-center py-4">
          <h2 className="fw-bold mb-3">Solicitar Auditoría Técnica in Situ</h2>
          <p className="mb-4 fs-5 opacity-75">Evaluamos su infraestructura ambiental para garantizar el cumplimiento normativo y la eficiencia operativa.</p>
          <button 
            onClick={() => setShowModal(true)}
            className="btn btn-light btn-lg text-success fw-bold rounded-pill px-5 shadow-lg"
          >
            Agendar Inspección Técnica
          </button>
        </div>
      </footer>

      {/* MODAL MEJORADO */}
      {showModal && (
        <div className="modal-custom-overlay">
          <div className="modal-custom-content shadow-lg rounded-4 overflow-hidden border-top border-success border-5">
            {!enviado ? (
              <form onSubmit={handleEnviar} className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold text-dark m-0">Detalles de la Visita</h4>
                  <button type="button" onClick={() => setShowModal(false)} className="btn-close"></button>
                </div>
                
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold">Servicio Requerido</label>
                    <select className="form-select border-success" required>
                      <option value="">Seleccione el área técnica...</option>
                      <option>Gestión de Residuos Peligrosos</option>
                      <option>Tratamiento de Aguas Residuales</option>
                      <option>Saneamiento y Control de Plagas</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Dirección de la Sede/Planta</label>
                    <input type="text" className="form-control border-success" placeholder="Av. Industrial 123, Distrito" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Fecha Sugerida</label>
                    <input type="date" className="form-control border-success" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Hora Sugerida</label>
                    <input type="time" className="form-control border-success" required />
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-success w-100 fw-bold rounded-pill py-2 shadow">Confirmar Solicitud de Auditoría</button>
                </div>
              </form>
            ) : (
              <div className="text-center py-5 p-4">
                <i className="bi bi-calendar-check text-success display-1 mb-3"></i>
                <h4 className="fw-bold">Solicitud Registrada</h4>
                <p className="text-muted">Nuestro equipo de ingeniería revisará los horarios disponibles y se pondrá en contacto con usted en un plazo máximo de 2 horas.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiciosPage;