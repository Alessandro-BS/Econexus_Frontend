import React from 'react';
import { Link } from 'react-router-dom';

const CatalogoServiciosPage = () => {
  return (
    <div className="servicios-page animate-slide-up">
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center max-w-700 mx-auto mb-5">
            <h6 className="text-success text-uppercase fw-bold tracking-wider mb-2">Nuestros Servicios</h6>
            <h2 className="display-5 fw-bold mb-3 text-dark">Soluciones Especializadas</h2>
            <p className="lead text-secondary">
              Ofrecemos una gama completa de servicios diseñados para proteger el medio ambiente y asegurar el cumplimiento de las normativas de su empresa.
            </p>
          </div>

          <div className="row g-4">
            {/* Service 1 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm service-card transition-all">
                <div className="card-body p-5">
                  <div className="icon-wrapper bg-success-subtle text-success mb-4 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-trash3 fs-1"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Gestión de Residuos</h4>
                  <p className="text-secondary mb-0">
                    Recolección, transporte y disposición final de residuos sólidos, peligrosos y no peligrosos, siguiendo estrictos protocolos de seguridad y protección ambiental.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm service-card transition-all">
                <div className="card-body p-5">
                  <div className="icon-wrapper bg-success-subtle text-success mb-4 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-droplet fs-1"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Tratamiento de Aguas</h4>
                  <p className="text-secondary mb-0">
                    Sistemas avanzados para el tratamiento y purificación de aguas residuales industriales y domésticas, garantizando su retorno seguro al medio ambiente.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm service-card transition-all">
                <div className="card-body p-5">
                  <div className="icon-wrapper bg-success-subtle text-success mb-4 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-bug fs-1"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Control de Plagas</h4>
                  <p className="text-secondary mb-0">
                    Servicios de fumigación, desratización y desinsectación industrial utilizando productos biodegradables y seguros para el personal humano y el entorno.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5 pt-4">
            <Link to="/contacto" className="btn btn-outline-success btn-lg rounded-pill px-5">Consultar un servicio específico</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CatalogoServiciosPage;
