import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../../assets/econexus-sin-fondo.png';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header & Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#inicio">
            <img src={logo} alt="Econexus Logo" height="50" className="me-2" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <a className="nav-link fw-medium px-3" href="#inicio">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium px-3" href="#nosotros">Nosotros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium px-3" href="#servicios">Servicios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium px-3" href="#galeria">Galería</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium px-3" href="#contacto">Contáctanos</a>
              </li>
              <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                <Link to="/login" className="btn btn-success px-4 rounded-pill fw-bold shadow-sm">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
                <a href="#servicios" className="btn btn-lg btn-success rounded-pill px-5 py-3 fw-bold animate-slide-up delay-2 shadow">Descubre Más</a>
              </div>
            </div>
            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="carousel-bg-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}></div>
              <div className="carousel-overlay"></div>
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                <h1 className="display-3 fw-bold text-white mb-4 animate-slide-up">Manejo Responsable de Residuos</h1>
                <p className="lead text-white mb-5 animate-slide-up delay-1">Gestionamos de manera eficiente y segura los residuos de tu organización.</p>
                <a href="#contacto" className="btn btn-lg btn-light rounded-pill px-5 py-3 fw-bold animate-slide-up delay-2 shadow">Contáctanos Hoy</a>
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

      {/* Description / Nosotros */}
      <section id="nosotros" className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="position-relative">
                <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sobre Econexus" className="img-fluid rounded-4 shadow-lg" />
                <div className="experience-badge bg-success text-white p-4 rounded-circle position-absolute d-flex flex-column justify-content-center align-items-center shadow" style={{ bottom: '-30px', right: '-30px', width: '150px', height: '150px' }}>
                  <h3 className="fw-bold mb-0">15+</h3>
                  <span className="text-center small">Años de<br/>Experiencia</span>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <h6 className="text-success text-uppercase fw-bold tracking-wider mb-2">Sobre Nosotros</h6>
              <h2 className="display-5 fw-bold mb-4 text-dark">Líderes en Saneamiento y Cuidado Ambiental</h2>
              <p className="lead text-secondary mb-4">
                En Econexus, nos dedicamos a ofrecer soluciones sostenibles y eficientes en saneamiento ambiental. Nuestro compromiso es garantizar un entorno limpio y seguro para empresas y comunidades.
              </p>
              <p className="text-secondary mb-4">
                A través de la innovación constante y el uso de tecnologías amigables con el ecosistema, abordamos los desafíos medioambientales más complejos, asegurando el cumplimiento normativo y promoviendo el bienestar integral.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                  <span className="fw-medium text-dark">Personal altamente capacitado</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                  <span className="fw-medium text-dark">Cumplimiento de normativas vigentes</span>
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success fs-5 me-3"></i>
                  <span className="fw-medium text-dark">Compromiso con la sostenibilidad</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-5">
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
        </div>
      </section>

      {/* Galería (Placeholder for visual appeal) */}
      <section id="galeria" className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h6 className="text-success text-uppercase fw-bold tracking-wider mb-2">Galería</h6>
            <h2 className="display-5 fw-bold text-dark">Nuestro Trabajo en Acción</h2>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="gallery-item overflow-hidden rounded-3 shadow-sm">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Galería 1" className="img-fluid w-100 transition-transform" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery-item overflow-hidden rounded-3 shadow-sm">
                <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Galería 2" className="img-fluid w-100 transition-transform" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="gallery-item overflow-hidden rounded-3 shadow-sm">
                <img src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Galería 3" className="img-fluid w-100 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-dark text-white pt-5 pb-4">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <img src={logo} alt="Econexus Logo" height="60" className="mb-4 bg-white p-2 rounded" />
              <p className="text-white-50 mb-4 pe-lg-4">
                Brindando soluciones de saneamiento ambiental de primer nivel. Comprometidos con el ecosistema y el desarrollo sostenible de tu empresa.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="social-icon bg-white text-dark rounded-circle d-flex align-items-center justify-content-center transition-all" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-icon bg-white text-dark rounded-circle d-flex align-items-center justify-content-center transition-all" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="social-icon bg-white text-dark rounded-circle d-flex align-items-center justify-content-center transition-all" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="social-icon bg-white text-dark rounded-circle d-flex align-items-center justify-content-center transition-all" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-4 mb-4 mb-md-0">
              <h5 className="text-white mb-4 fw-bold">Enlaces Rápidos</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a href="#inicio" className="text-white-50 text-decoration-none hover-white transition-all">Inicio</a></li>
                <li className="mb-2"><a href="#nosotros" className="text-white-50 text-decoration-none hover-white transition-all">Nosotros</a></li>
                <li className="mb-2"><a href="#servicios" className="text-white-50 text-decoration-none hover-white transition-all">Servicios</a></li>
                <li className="mb-2"><a href="#galeria" className="text-white-50 text-decoration-none hover-white transition-all">Galería</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="text-white mb-4 fw-bold">Servicios</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a href="#servicios" className="text-white-50 text-decoration-none hover-white transition-all">Gestión de Residuos</a></li>
                <li className="mb-2"><a href="#servicios" className="text-white-50 text-decoration-none hover-white transition-all">Tratamiento de Aguas</a></li>
                <li className="mb-2"><a href="#servicios" className="text-white-50 text-decoration-none hover-white transition-all">Control de Plagas</a></li>
                <li className="mb-2"><a href="#servicios" className="text-white-50 text-decoration-none hover-white transition-all">Consultoría</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4">
              <h5 className="text-white mb-4 fw-bold">Contacto</h5>
              <ul className="list-unstyled mb-0 text-white-50">
                <li className="mb-3 d-flex align-items-start">
                  <i className="bi bi-geo-alt-fill text-success me-3 mt-1"></i>
                  <span>Av. Principal 123, Distrito Sostenible, Lima</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-telephone-fill text-success me-3"></i>
                  <span>+51 987 654 321</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <i className="bi bi-envelope-fill text-success me-3"></i>
                  <span>contacto@econexus.com.pe</span>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-4 border-secondary" />
          <div className="text-center text-white-50">
            <small>&copy; {new Date().getFullYear()} Econexus. Todos los derechos reservados.</small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
