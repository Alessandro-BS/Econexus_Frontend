import React from 'react';
import { Link } from 'react-router-dom';
import './ServiciosPage.css';

const ServiciosPage = () => {
  return (
    <div className="servicios-detalle bg-light">
      {/* Navegación */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="btn btn-sm btn-outline-success rounded-pill px-3">
            <i className="bi bi-arrow-left me-1"></i> Volver
          </Link>
          <span className="ms-auto fw-bold text-success border-start ps-3">División de Ingeniería Ambiental</span>
        </div>
      </nav>

      {/* Hero Section Industrial */}
      <header className="bg-dark text-white py-5 position-relative overflow-hidden">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-8 text-start">
              <span className="badge bg-success mb-2 px-3 py-2">OPERADORA AUTORIZADA</span>
              <h1 className="display-4 fw-bold">Gestión Integral de Pasivos y Residuos</h1>
              <p className="lead text-white-50">Soluciones de alta complejidad para los sectores de Minería, Salud e Industria Pesada.</p>
            </div>
          </div>
        </div>
        <div className="position-absolute top-50 start-50 translate-middle opacity-10">
          <i className="bi bi-cone-striped display-1" style={{ fontSize: '20rem' }}></i>
        </div>
      </header>

      <main className="container py-5">
        {/* SECCIÓN 1: SERVICIOS POR CATEGORÍA TÉCNICA */}
        <div className="row g-4 mb-5">
          <h2 className="fw-bold h3 mb-4"><i className="bi bi-gear-fill text-success me-2"></i>Líneas de Servicio Especializado</h2>
          
          {/* Gestión de Residuos Peligrosos (Inspirado en tus Reportes) */}
          <div className="col-md-6 col-xl-4">
            <div className="card h-100 border-0 shadow-sm overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded-3 me-3">
                    <i className="bi bi-exclamation-triangle-fill text-success fs-3"></i>
                  </div>
                  <h4 className="fw-bold m-0">Residuos Peligrosos</h4>
                </div>
                <p className="text-muted small">Manejo especializado de MATPEL (Materiales Peligrosos) con trazabilidad completa.</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item bg-transparent px-0 py-1 text-secondary small border-0"><i className="bi bi-dot"></i> Aceites usados, Baterías y Filtros</li>
                  <li className="list-group-item bg-transparent px-0 py-1 text-secondary small border-0"><i className="bi bi-dot"></i> Tierra contaminada con hidrocarburos</li>
                  <li className="list-group-item bg-transparent px-0 py-1 text-secondary small border-0"><i className="bi bi-dot"></i> Envases químicos y lodos industriales</li>
                </ul>
                <div className="bg-light p-2 rounded small text-center fw-bold text-success border border-success-subtle">
                  CAPACIDAD: HASTA 500 TN / MES
                </div>
              </div>
            </div>
          </div>

          {/* Tratamiento de Aguas (Inspirado en Alimentos Procesados Lima) */}
          <div className="col-md-6 col-xl-4">
            <div className="card h-100 border-0 shadow-sm overflow-hidden">
              <div className="card-body p-4 text-white" style={{ backgroundColor: '#1a1d20' }}>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-25 p-3 rounded-3 me-3">
                    <i className="bi bi-droplet-half text-primary fs-3"></i>
                  </div>
                  <h4 className="fw-bold m-0 text-white">Tratamiento de Aguas</h4>
                </div>
                <p className="text-white-50 small">Sistemas avanzados de purificación y evacuación de lodos residuales.</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item bg-transparent px-0 py-1 text-white-50 small border-0"><i className="bi bi-dot text-primary"></i> Aguas residuales domésticas e industriales</li>
                  <li className="list-group-item bg-transparent px-0 py-1 text-white-50 small border-0"><i className="bi bi-dot text-primary"></i> Succión de pozos sépticos y trampas de grasa</li>
                  <li className="list-group-item bg-transparent px-0 py-1 text-white-50 small border-0"><i className="bi bi-dot text-primary"></i> Cumplimiento de LMP para descarga</li>
                </ul>
                <div className="bg-dark p-2 rounded small text-center fw-bold text-primary border border-primary-subtle">
                  VOLUMEN: +10,000 LITROS / JORNADA
                </div>
              </div>
            </div>
          </div>

          {/* Saneamiento y Sanidad (Inspirado en Hospitales) */}
          <div className="col-md-6 col-xl-4">
            <div className="card h-100 border-0 shadow-sm overflow-hidden border-top border-success border-4">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success bg-opacity-10 p-3 rounded-3 me-3">
                    <i className="bi bi-shield-shaded text-success fs-3"></i>
                  </div>
                  <h4 className="fw-bold m-0">Sanidad Hospitalaria</h4>
                </div>
                <p className="text-muted small">Protocolos de alta desinfección para entornos críticos de salud.</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item bg-transparent px-0 py-1 text-secondary small border-0"><i className="bi bi-dot text-success"></i> Desinfección virucida y bactericida</li>
                  <li className="list-group-item bg-transparent px-0 py-1 text-secondary small border-0"><i className="bi bi-dot text-success"></i> Desinsectación y control de plagas (Fumigación)</li>
                  <li className="list-group-item bg-transparent px-0 py-1 text-secondary small border-0"><i className="bi bi-dot text-success"></i> Certificación inmediata según TUPA DIGESA</li>
                </ul>
                <div className="bg-light p-2 rounded small text-center fw-bold text-success border border-success-subtle">
                  ESTÁNDAR: NTS N° 144-MINSA
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: MARCO LEGAL (Datos Reales de tu Admin) */}
        <div className="bg-white rounded-4 shadow-sm p-4 mb-5 border border-success-subtle">
          <div className="row align-items-center">
            <div className="col-lg-4 border-end border-light pe-4">
              <h3 className="fw-bold mb-3">Marco Legal y Auditoría</h3>
              <p className="text-muted small">Nuestras operaciones están estrictamente vigiladas por las entidades fiscalizadoras del Estado Peruano.</p>
              <div className="d-flex gap-2">
                <span className="badge bg-light text-success border">MINAM</span>
                <span className="badge bg-light text-success border">DIGESA</span>
                <span className="badge bg-light text-success border">OEFA</span>
              </div>
            </div>
            <div className="col-lg-8 ps-lg-4 mt-4 mt-lg-0">
              <div className="table-responsive">
                <table className="table table-sm table-borderless align-middle mb-0">
                  <thead className="text-uppercase small fw-bold text-muted border-bottom">
                    <tr>
                      <th>Código Norma</th>
                      <th>Descripción Oficial</th>
                    </tr>
                  </thead>
                  <tbody className="small">
                    <tr>
                      <td className="fw-bold py-2">DS N° 014-2017-MINAM</td>
                      <td>Ley de Gestión Integral de Residuos Sólidos</td>
                    </tr>
                    <tr>
                      <td className="fw-bold py-2">NTS N° 144-MINSA/2018</td>
                      <td>Manejo de Residuos Sólidos en Establecimientos de Salud</td>
                    </tr>
                    <tr>
                      <td className="fw-bold py-2">TUPA 25</td>
                      <td>Vigilancia Sanitaria de Desinfectantes y Plaguicidas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: MÉTRICAS DE CONFIANZA */}
        <div className="row g-4 text-center">
          <div className="col-6 col-md-3">
            <div className="p-3">
              <div className="h2 fw-bold text-success mb-0">+15</div>
              <div className="small text-muted text-uppercase tracking-wider">Años Experiencia</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 border-start border-light">
              <div className="h2 fw-bold text-success mb-0">100%</div>
              <div className="small text-muted text-uppercase tracking-wider">Cumplimiento Legal</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 border-start border-light">
              <div className="h2 fw-bold text-success mb-0">+10</div>
              <div className="small text-muted text-uppercase tracking-wider">Clientes Corporativos</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 border-start border-light">
              <div className="h2 fw-bold text-success mb-0">24/7</div>
              <div className="small text-muted text-uppercase tracking-wider">Soporte Técnico</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / CTA final */}
      <footer className="bg-success text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">¿Desea programar una inspección técnica?</h2>
          <p className="mb-4 opacity-75 mx-auto" style={{ maxWidth: '600px' }}>
            Nuestros supervisores y operadores están listos para evaluar la gestión ambiental de su empresa y emitir los informes de cumplimiento necesarios.
          </p>
          <Link to="/" className="btn btn-light text-success btn-lg fw-bold rounded-pill px-5 shadow">
            Iniciar Gestión Administrativa
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ServiciosPage;