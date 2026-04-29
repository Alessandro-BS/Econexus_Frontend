import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServiciosPage.css';

const ServiciosPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e) => {
    e.preventDefault();
    setEnviado(true);
    // Cierre rápido del modal para mejorar la experiencia
    setTimeout(() => { 
      setShowModal(false); 
      setEnviado(false); 
    }, 1800);
  };

  return (
    <div className="servicios-page-master">
      {/* Barra de Navegación - Ancho Completo */}
      <nav className="custom-nav-servicios">
        <div className="nav-content">
          <Link to="/" className="back-link">
            <i className="bi bi-arrow-left-circle-fill"></i> Volver al Inicio
          </Link>
          <div className="brand-tag">Econexus | División de Ingeniería</div>
        </div>
      </nav>

      {/* Hero Industrial - Ocupa todo el ancho con degradado fuerte */}
      <section className="hero-full-width">
        <div className="container">
          <div className="hero-text-box">
            <span className="status-badge">Operación Nacional Certificada</span>
            <h1>Soluciones Ambientales de Alto Impacto</h1>
            <p>
              Transformamos la gestión de residuos y efluentes en una ventaja competitiva para su empresa. 
              Cumplimiento técnico, legal y operativo garantizado.
            </p>
            <a href="#detalles" className="cta-scroll">Explorar Especialidades <i className="bi bi-chevron-down"></i></a>
          </div>
        </div>
        <div className="floating-icon">
          <i className="bi bi-cone-striped"></i>
        </div>
      </section>

      {/* Grid de Servicios - Diseño Limpio */}
      <main id="detalles" className="container py-5">
        <div className="section-title text-center mb-5">
          <h2>Nuestros Ejes Operativos</h2>
          <div className="title-underline"></div>
        </div>

        <div className="row g-4">
          {/* MATPEL */}
          <div className="col-lg-4">
            <div className="service-card shadow-lg">
              <div className="card-icon bg-green-soft">
                <i className="bi bi-recycle"></i>
              </div>
              <h4>Gestión de Residuos</h4>
              <p>Manejo integral de materiales peligrosos y no peligrosos. Nos encargamos de la recolección, transporte y disposición final en rellenos de seguridad autorizados.</p>
              <ul className="feature-list">
                <li><i className="bi bi-check-circle"></i> Trazabilidad con GPS</li>
                <li><i className="bi bi-check-circle"></i> Emisión de Manifiestos</li>
                <li><i className="bi bi-check-circle"></i> Residuos MATPEL / Industriales</li>
              </ul>
            </div>
          </div>

          {/* AGUAS */}
          <div className="col-lg-4">
            <div className="service-card featured-dark">
              <div className="card-icon bg-blue-bright">
                <i className="bi bi-droplet-fill"></i>
              </div>
              <h4 className="text-white">Ingeniería de Aguas</h4>
              <p>Tratamiento de efluentes y lodos. Diseñamos y operamos plantas (PTAR) para asegurar que sus vertimientos cumplan con todos los Límites Máximos Permisibles.</p>
              <ul className="feature-list list-white">
                <li><i className="bi bi-check-circle text-primary"></i> Succión de Pozos Sépticos</li>
                <li><i className="bi bi-check-circle text-primary"></i> Limpieza de Cisternas</li>
                <li><i className="bi bi-check-circle text-primary"></i> Análisis de Calidad VMA</li>
              </ul>
            </div>
          </div>

          {/* PLAGAS */}
          <div className="col-lg-4">
            <div className="service-card shadow-lg">
              <div className="card-icon bg-green-soft">
                <i className="bi bi-shield-lock"></i>
              </div>
              <h4>Sanidad e Higiene</h4>
              <p>Control profesional de plagas y desinfección de ambientes críticos. Utilizamos productos biodegradables Grado III que cuidan a su personal y al entorno.</p>
              <ul className="feature-list">
                <li><i className="bi bi-check-circle"></i> Fumigación Certificada</li>
                <li><i className="bi bi-check-circle"></i> Control de Roedores</li>
                <li><i className="bi bi-check-circle"></i> Certificado DIGESA inmediato</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Sección de Metodología para dar "Floro" y confianza */}
      <section className="metodologia-full">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mb-4">¿Cómo aseguramos la excelencia?</h2>
              <div className="step-item">
                <div className="step-num">01</div>
                <div>
                  <h5>Diagnóstico Técnico</h5>
                  <p className="text-muted">Analizamos sus procesos actuales para identificar brechas de cumplimiento.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-num">02</div>
                <div>
                  <h5>Plan de Mitigación</h5>
                  <p className="text-muted">Diseñamos una estrategia logística personalizada para reducir costos.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-num">03</div>
                <div>
                  <h5>Certificación Total</h5>
                  <p className="text-muted">Entregamos toda la documentación válida para auditorías de OEFA y SUNAFIL.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <div className="experience-badge shadow-lg">
                <span className="number">15+</span>
                <span className="text">Años Liderando el Sector</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA - Ancho Completo */}
      <footer className="footer-cta-full">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-4">Optimice su Gestión Ambiental Hoy</h2>
          <p className="mb-5 fs-5">Solicite una inspección técnica sin compromiso en sus instalaciones.</p>
          <button onClick={() => setShowModal(true)} className="btn-inspeccion shadow-lg">
            Agendar Visita de Campo
          </button>
        </div>
      </footer>

      {/* Modal - Ventana Emergente */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-body shadow-2xl">
            {!enviado ? (
              <form onSubmit={handleEnviar} className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                  <h4 className="fw-bold m-0">Solicitud de Auditoría</h4>
                  <button type="button" onClick={() => setShowModal(false)} className="btn-close-custom">✕</button>
                </div>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="label-custom">Área de Interés</label>
                    <select className="input-custom" required>
                      <option value="">Seleccione...</option>
                      <option>Gestión de Residuos</option>
                      <option>Tratamiento de Aguas</option>
                      <option>Saneamiento Ambiental</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="label-custom">Dirección de la Planta / Sede</label>
                    <input type="text" className="input-custom" placeholder="Calle, Av, Distrito..." required />
                  </div>
                  <div className="col-md-6">
                    <label className="label-custom">Fecha Sugerida</label>
                    <input type="date" className="input-custom" required />
                  </div>
                  <div className="col-md-6">
                    <label className="label-custom">Hora</label>
                    <input type="time" className="input-custom" required />
                  </div>
                </div>
                <button type="submit" className="btn-submit-modal mt-4">Confirmar e Iniciar Proceso</button>
              </form>
            ) : (
              <div className="success-state p-5 text-center">
                <i className="bi bi-check-circle-fill text-success display-1"></i>
                <h3 className="fw-bold mt-3">¡Solicitud Enviada!</h3>
                <p className="text-muted">Nuestro equipo de ingeniería revisará la disponibilidad y confirmará la visita en menos de 2 horas.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiciosPage;