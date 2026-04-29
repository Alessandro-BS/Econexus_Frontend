import React from 'react';
import { Link } from 'react-router-dom';
import './ServiciosPage.css'; // ¡Ya lo dejamos listo para el siguiente paso!

const ServiciosPage = () => {
  return (
    <div className="servicios-detalle">
      {/* Navegación superior */}
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="btn btn-outline-success rounded-pill px-4">
            <i className="bi bi-arrow-left me-2"></i>Volver al Inicio
          </Link>
          <span className="fw-bold text-success fs-5">Econexus | Servicios Especializados</span>
        </div>
      </nav>

      {/* Cabecera principal - AHORA OCUPA TODO EL ANCHO (Fondo verde) */}
      <header className="bg-success text-white py-5 text-center shadow">
        <div className="container py-4">
          <h1 className="display-4 fw-bold mb-3">Soluciones a tu Medida</h1>
          <p className="lead fs-4 w-75 mx-auto">
            Descubre en detalle cómo protegemos el medio ambiente y aseguramos el futuro sostenible de tu empresa.
          </p>
        </div>
      </header>

      {/* Contenedor de Tarjetas */}
      <main className="container py-5">
        <div className="row g-5">
          
          {/* Tarjeta 1: Residuos */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow p-4 d-flex flex-column">
              <i className="bi bi-trash text-success fs-1 mb-3"></i>
              <h3 className="fw-bold text-dark">Gestión de Residuos</h3>
              <p className="text-muted">
                Recolección, transporte y disposición final siguiendo estrictos protocolos de seguridad ambiental.
              </p>
              <ul className="list-unstyled mb-4 mt-2">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Residuos Sólidos e Industriales</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Materiales Peligrosos (MATPEL)</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Emisión de Certificados de Disposición</li>
              </ul>
              <div className="mt-auto">
                <button className="btn btn-outline-success w-100 fw-bold rounded-pill">Solicitar Cotización</button>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Aguas (Destacada en oscuro) */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow p-4 text-white bg-dark d-flex flex-column">
              <i className="bi bi-water text-success fs-1 mb-3"></i>
              <h3 className="fw-bold text-white">Tratamiento de Aguas</h3>
              <p className="text-white-50">
                Sistemas avanzados para el tratamiento y purificación de aguas residuales garantizando su retorno seguro.
              </p>
              <ul className="list-unstyled mb-4 mt-2 text-white-50">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Plantas de Tratamiento (PTAR)</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Limpieza de Pozos y Cisternas</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Cumplimiento de LMP y ECA</li>
              </ul>
              <div className="mt-auto">
                <button className="btn btn-success w-100 fw-bold rounded-pill">Solicitar Cotización</button>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Plagas */}
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 border-0 shadow p-4 d-flex flex-column">
              <i className="bi bi-bug text-success fs-1 mb-3"></i>
              <h3 className="fw-bold text-dark">Control de Plagas</h3>
              <p className="text-muted">
                Servicios de fumigación utilizando productos biodegradables y seguros para el personal y el entorno.
              </p>
              <ul className="list-unstyled mb-4 mt-2">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Desinsectación y Desratización</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Desinfección de Ambientes (Virus/Bacterias)</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Certificado de Saneamiento</li>
              </ul>
              <div className="mt-auto">
                <button className="btn btn-outline-success w-100 fw-bold rounded-pill">Solicitar Cotización</button>
              </div>
            </div>
          </div>

        </div>

        {/* Sección de Certificaciones (Más comercial) */}
        <div className="mt-5 p-4 bg-light rounded-4 border-top text-center">
          <p className="text-muted mb-3 fw-bold text-uppercase tracking-wide">Nuestras Garantías y Autorizaciones</p>
          <div className="d-flex justify-content-center flex-wrap gap-4">
            <span className="fs-5 fw-semibold text-dark"><i className="bi bi-shield-check text-success"></i> ISO 14001 y 9001</span>
            <span className="fs-5 fw-semibold text-dark"><i className="bi bi-shield-check text-success"></i> Autorización DIGESA</span>
            <span className="fs-5 fw-semibold text-dark"><i className="bi bi-shield-check text-success"></i> Normativa MINAM</span>
          </div>
        </div>
      </main>

      {/* Call to Action Final (Ocupa todo el ancho) */}
      <div className="bg-success text-white text-center py-5 mt-4">
        <div className="container">
          <h2 className="fw-bold mb-3">¿Listo para un entorno más seguro y sostenible?</h2>
          <p className="mb-4 fs-5">Contáctanos hoy mismo y recibe asesoría especializada para tu empresa.</p>
          <Link to="/" className="btn btn-light text-success btn-lg fw-bold rounded-pill px-5 shadow-sm">
            Ir a Contacto
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiciosPage;