import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServiciosPage.css';

const ServiciosPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e) => {
    e.preventDefault();
    setEnviado(true);
    // Desaparece rápido para no aburrir al usuario
    setTimeout(() => { 
      setShowModal(false); 
      setEnviado(false); 
    }, 1600);
  };

  return (
    <div className="servicios-detalle-wrapper">
      {/* Navbar Simple y Elegante */}
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top py-3">
        <div className="container-fluid px-md-5">
          <Link to="/" className="btn btn-outline-success rounded-pill px-4 fw-bold">
            <i className="bi bi-house-door me-2"></i>Inicio
          </Link>
          <span className="fw-bold text-success d-none d-md-inline">
            <i className="bi bi-patch-check me-2"></i>Unidad de Gestión Ambiental
          </span>
        </div>
      </nav>

      {/* Hero Section Industrial - FULL WIDTH */}
      <header className="hero-industrial-full text-white position-relative">
        <div className="container py-5 position-relative" style={{ zIndex: 10 }}>
          <div className="row py-5">
            <div className="col-lg-8">
              <span className="badge bg-success px-3 py-2 mb-3 shadow-sm">OPERADORA IP-RE-0045-2026</span>
              <h1 className="display-3 fw-bold mb-3">Ingeniería que transforma <br/> tu impacto ambiental</h1>
              <p className="lead fs-4 opacity-75 mb-4">
                No solo gestionamos residuos; diseñamos ecosistemas operativos seguros para que tu empresa nunca se detenga.
              </p>
              <div className="d-flex gap-3">
                <a href="#especialidades" className="btn btn-light btn-lg px-4 rounded-pill fw-bold text-success">Ver Especialidades</a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-overlay-icon">
          <i className="bi bi-cone-striped"></i>
        </div>
      </header>

      {/* Sección 1: Nuestras Especialidades */}
      <main id="especialidades" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 text-dark">Soluciones de Alta Complejidad</h2>
          <p className="text-muted fs-5">Tecnología y cumplimiento normativo en cada etapa del proceso.</p>
        </div>

        <div className="row g-4 mb-5">
          {/* Tarjeta 1: MATPEL */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm p-4 tech-card">
              <div className="d-flex justify-content-between mb-4">
                <div className="icon-box bg-warning bg-opacity-10 text-warning p-3 rounded-4">
                  <i className="bi bi-radioactive fs-1"></i>
                </div>
                <span className="small fw-bold text-muted mt-2">NTS 144-MINSA</span>
              </div>
              <h4 className="fw-bold">Gestión MATPEL</h4>
              <p className="text-muted mb-4">Especialistas en materiales peligrosos, lodos de perforación y suelos contaminados con hidrocarburos. Servicio con trazabilidad GPS 24/7.</p>
              <ul className="list-unstyled small mb-4 flex-grow-1">
                <li><i className="bi bi-check2-circle text-success me-2"></i>Recolección de aceites y baterías</li>
                <li><i className="bi bi-check2-circle text-success me-2"></i>Disposición en celdas de seguridad</li>
                <li><i className="bi bi-check2-circle text-success me-2"></i>Emisión de manifiestos oficiales</li>
              </ul>
            </div>
          </div>

          {/* Tarjeta 2: AGUAS */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-lg p-4 bg-dark text-white tech-card">
              <div className="d-flex justify-content-between mb-4">
                <div className="icon-box bg-primary bg-opacity-25 text-primary p-3 rounded-4">
                  <i className="bi bi-water fs-1"></i>
                </div>
                <span className="small fw-bold text-primary mt-2">D.S. 010-2019</span>
              </div>
              <h4 className="fw-bold">Ingeniería de Aguas</h4>
              <p className="text-white-50 mb-4">Operación de PTAR, succión de lodos y limpieza química de cisternas industriales. Cumplimos con los Límites Máximos Permisibles.</p>
              <ul className="list-unstyled small mb-4 flex-grow-1">
                <li><i className="bi bi-check2-circle text-primary me-2"></i>Tratamiento de efluentes industriales</li>
                <li><i className="bi bi-check2-circle text-primary me-2"></i>Limpieza de trampas de grasa</li>
                <li><i className="bi bi-check2-circle text-primary me-2"></i>Monitoreo de calidad VMA</li>
              </ul>
            </div>
          </div>

          {/* Tarjeta 3: SANIDAD */}
          <div className="col-lg-4">
            <div className="card h-100 border-0 shadow-sm p-4 tech-card border-bottom border-success border-5">
              <div className="d-flex justify-content-between mb-4">
                <div className="icon-box bg-success bg-opacity-10 text-success p-3 rounded-4">
                  <i className="bi bi-shield-plus fs-1"></i>
                </div>
                <span className="small fw-bold text-muted mt-2">TUPA 25 - DIGESA</span>
              </div>
              <h4 className="fw-bold">Sanidad Industrial</h4>
              <p className="text-muted mb-4">Fumigación virucida y control integral de plagas en entornos críticos como hospitales y plantas de alimentos.</p>
              <ul className="list-unstyled small mb-4 flex-grow-1">
                <li><i className="bi bi-check2-circle text-success me-2"></i>Desinfección de alto nivel</li>
                <li><i className="bi bi-check2-circle text-success me-2"></i>Control biológico de plagas</li>
                <li><i className="bi bi-check2-circle text-success me-2"></i>Certificación sanitaria inmediata</li>
              </ul>
            </div>
          </div>
        </div>

        {/* NUEVA SECCIÓN: METODOLOGÍA (Para convencer) */}
        <section className="py-5 mt-5">
          <div className="bg-white rounded-5 shadow-sm p-5 border overflow-hidden position-relative">
            <div className="row g-4 position-relative" style={{zIndex: 2}}>
              <div className="col-md-5">
                <h2 className="fw-bold display-6 mb-4">¿Por qué confiar <br/> su empresa a <br/> Econexus?</h2>
                <p className="text-muted">No solo cumplimos con la ley; optimizamos sus costos operativos reduciendo la generación de residuos en la fuente.</p>
                <div className="d-flex align-items-center mt-4">
                  <div className="h1 fw-bold text-success me-3">15+</div>
                  <div className="fw-bold text-uppercase small text-muted">Años de <br/> experiencia real</div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="row g-4">
                  <div className="col-sm-6">
                    <h5 className="fw-bold"><i className="bi bi-clock-history text-success me-2"></i>Respuesta 24/7</h5>
                    <p className="small text-muted">Atención inmediata ante derrames o contingencias ambientales accidentales.</p>
                  </div>
                  <div className="col-sm-6">
                    <h5 className="fw-bold"><i className="bi bi-graph-up-arrow text-success me-2"></i>Eficiencia</h5>
                    <p className="small text-muted">Logística inversa que permite valorizar residuos para su reutilización.</p>
                  </div>
                  <div className="col-sm-6">
                    <h5 className="fw-bold"><i className="bi bi-shield-check text-success me-2"></i>Cero Multas</h5>
                    <p className="small text-muted">Nuestro equipo legal asegura que sus auditorías de OEFA siempre sean exitosas.</p>
                  </div>
                  <div className="col-sm-6">
                    <h5 className="fw-bold"><i className="bi bi-truck text-success me-2"></i>Flota Propia</h5>
                    <p className="small text-muted">Contamos con camiones cisterna y furgones autorizados por el MTC.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer CTA - FULL WIDTH */}
      <footer className="footer-industrial-cta text-white py-5">
        <div className="container text-center py-5">
          <h2 className="fw-bold display-5 mb-4">¿Listo para elevar su estándar ambiental?</h2>
          <p className="fs-5 opacity-75 mb-5 mx-auto" style={{maxWidth: '700px'}}>
            Nuestros ingenieros evaluarán sus instalaciones para diseñar un plan de gestión a medida, sin compromiso.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="btn btn-light btn-lg text-success fw-bold rounded-pill px-5 py-3 shadow-lg hover-scale"
          >
            Agendar Auditoría Técnica in Situ
          </button>
        </div>
      </footer>

      {/* MODAL DE SOLICITUD MEJORADO */}
      {showModal && (
        <div className="modal-custom-overlay">
          <div className="modal-custom-content rounded-5 shadow-2xl border-0 overflow-hidden">
            {!enviado ? (
              <form onSubmit={handleEnviar} className="p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-bold m-0 text-dark">Nueva Solicitud</h3>
                  <button type="button" onClick={() => setShowModal(false)} className="btn-close"></button>
                </div>
                
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold small text-muted text-uppercase">Línea Técnica</label>
                    <select className="form-select form-select-lg border-2 shadow-sm" required>
                      <option value="">Seleccione un área...</option>
                      <option>Residuos Peligrosos (MATPEL)</option>
                      <option>Tratamiento de Aguas Residuales</option>
                      <option>Saneamiento y Sanidad Industrial</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold small text-muted text-uppercase">Empresa y Dirección</label>
                    <input type="text" className="form-control form-control-lg border-2 shadow-sm" placeholder="Nombre de planta y distrito..." required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted text-uppercase">Fecha Preferente</label>
                    <input type="date" className="form-control form-control-lg border-2 shadow-sm" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted text-uppercase">Hora Sugerida</label>
                    <input type="time" className="form-control form-control-lg border-2 shadow-sm" required />
                  </div>
                </div>

                <div className="mt-5">
                  <button type="submit" className="btn btn-success btn-lg w-100 fw-bold rounded-pill shadow">Confirmar Auditoría</button>
                  <p className="text-center mt-3 text-muted small">Un ingeniero se pondrá en contacto en menos de 2 horas.</p>
                </div>
              </form>
            ) : (
              <div className="text-center py-5 px-4 bg-white">
                <div className="success-animation mb-4">
                  <i className="bi bi-calendar-check-fill text-success" style={{fontSize: '5rem'}}></i>
                </div>
                <h3 className="fw-bold text-dark">¡Solicitud Procesada!</h3>
                <p className="text-muted">Hemos registrado su visita técnica. Recibirá un correo de confirmación en breve.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiciosPage;