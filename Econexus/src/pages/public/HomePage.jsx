import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => { 
      setShowModal(false); 
      setEnviado(false); 
    }, 1600);
  };

  return (
    <div className="landing-page">
      {/* Carousel (Hero) */}
      <section id="inicio">
        <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <div className="carousel-bg-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}></div>
              <div className="carousel-overlay"></div>
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                <h1 className="display-3 fw-bold text-white mb-4 animate-slide-up">Soluciones Integrales de Saneamiento Ambiental</h1>
                <p className="lead text-white mb-5 animate-slide-up delay-1">Protegiendo el medio ambiente y asegurando un futuro sostenible para tu empresa.</p>
                <Link to="/servicios" className="btn btn-success btn-lg px-5 py-3 rounded-pill fw-bold">Descubre Más</Link>
              </div>
            </div>
            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="carousel-bg-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}></div>
              <div className="carousel-overlay"></div>
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                <h1 className="display-3 fw-bold text-white mb-4 animate-slide-up">Manejo Responsable de Residuos</h1>
                <p className="lead text-white mb-5 animate-slide-up delay-1">Gestionamos de manera eficiente y segura los residuos de tu organización.</p>
                <Link to="/contacto" className="btn btn-lg btn-light rounded-pill px-5 py-3 fw-bold animate-slide-up delay-2 shadow">Contáctanos Hoy</Link>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </section>

      {/* Soluciones de Alta Complejidad */}
      <section className="py-5">
        <div className="container py-5">
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
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section className="py-5 bg-light">
        <div className="container py-5">
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
        </div>
      </section>
    </div>
  );
};

export default HomePage;
