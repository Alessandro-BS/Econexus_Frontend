import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServiciosPage.css';

const ServiciosPage = () => {
  // Lógica para el Modal
  const [showModal, setShowModal] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => { setShowModal(false); setEnviado(false); }, 3000);
  };

  return (
    <div className="servicios-detalle bg-light">
      {/* Navegación */}
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="btn btn-sm btn-outline-success rounded-pill px-3">
            <i className="bi bi-arrow-left me-1"></i> Volver al Inicio
          </Link>
          <span className="fw-bold text-success border-start ps-3 d-none d-md-inline">División de Ingeniería Ambiental</span>
        </div>
      </nav>

      {/* Header Corregido (Icono al fondo y texto claro) */}
      <header className="hero-industrial text-white py-5 position-relative overflow-hidden bg-dark">
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <span className="badge bg-success mb-2 px-3 py-2 text-uppercase tracking-wider">Operadora Autorizada</span>
          <h1 className="display-3 fw-bold mb-3">Ingeniería en Gestión <br/> de Residuos y Pasivos</h1>
          <p className="lead fs-4 opacity-75 w-75">
            Soluciones técnicas para sectores críticos: Minería, Energía y Redes Hospitalarias.
          </p>
        </div>
        {/* El icono ahora es realmente un fondo sutil */}
        <div className="icon-bg-overlay">
          <i className="bi bi-cone-striped"></i>
        </div>
      </header>

      <main className="container py-5">
        {/* Sección de Tarjetas Técnicas (Basadas en tus datos de Admin) */}
        <div className="row g-4 mb-5">
          <h2 className="fw-bold h3 mb-4"><i className="bi bi-ui-checks-grid text-success me-2"></i>Especialidades Operativas</h2>
          
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <h5 className="fw-bold text-success"><i className="bi bi-radioactive me-2"></i>MATPEL</h5>
              <p className="small text-muted">Gestión de Aceites, Baterías y Filtros. Servicio activo para: <strong>Minera Los Andes.</strong></p>
              <div className="mt-auto border-top pt-2 small text-uppercase fw-bold text-secondary">Ley N° 1278</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 bg-dark text-white">
              <h5 className="fw-bold text-primary"><i className="bi bi-droplet-fill me-2"></i>PTAR Industrial</h5>
              <p className="small text-white-50">Tratamiento de lodos y efluentes. Cliente principal: <strong>Alimentos Procesados Lima.</strong></p>
              <div className="mt-auto border-top border-secondary pt-2 small text-uppercase fw-bold text-primary">D.S. 010-2019</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4">
              <h5 className="fw-bold text-success"><i className="bi bi-hospital me-2"></i>Sanidad Hospitalaria</h5>
              <p className="small text-muted">Alta desinfección virucida. Servicio activo para: <strong>Hospital Regional del Sur.</strong></p>
              <div className="mt-auto border-top pt-2 small text-uppercase fw-bold text-secondary">NTS 144-MINSA</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Acción con Modal */}
      <footer className="bg-success text-white py-5 border-top border-light border-5">
        <div className="container text-center py-4">
          <h2 className="fw-bold mb-3">¿Requiere una Inspección Técnica?</h2>
          <p className="mb-4 fs-5 opacity-75">Nuestros supervisores (Fabrizio Bustamante / Shayuri Garcia) evaluarán su planta.</p>
          <button 
            onClick={() => setShowModal(true)}
            className="btn btn-light btn-lg text-success fw-bold rounded-pill px-5 shadow-lg"
          >
            Agendar Visita de Campo
          </button>
        </div>
      </footer>

      {/* MODAL DE SIMULACIÓN (BOOTSTRAP) */}
      {showModal && (
        <div className="modal-custom-overlay">
          <div className="modal-custom-content shadow-lg rounded-4 p-4 border-top border-success border-5">
            {!enviado ? (
              <>
                <h4 className="fw-bold text-dark mb-3">Solicitud de Inspección</h4>
                <form onSubmit={handleEnviar}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Unidad Operativa Econexus</label>
                    <select className="form-select border-success" required>
                      <option value="">Seleccione un servicio...</option>
                      <option>Recolección de Residuos Sólidos</option>
                      <option>Tratamiento de Aguas Residuales</option>
                      <option>Fumigación y Control de Plagas</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Empresa / Razón Social</label>
                    <input type="text" className="form-control border-success" placeholder="Ej: Minera Los Andes" required />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success flex-grow-1 fw-bold rounded-pill">Generar Solicitud</button>
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-light rounded-pill">Cancelar</button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
                <h4 className="fw-bold">¡Solicitud Generada!</h4>
                <p className="text-muted small">Se ha asignado al <strong>Supervisor Fabrizio Bustamante</strong> para la inspección técnica.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiciosPage;