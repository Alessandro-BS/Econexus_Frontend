import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/econexus-sin-fondo.png';

const PublicFooter = () => {
  return (
    <footer id="contacto" className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container py-4">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 mb-4 mb-lg-0 text-center text-lg-start">
            <img src={logo} alt="Econexus Logo" height="60" className="mb-4 bg-white p-2 rounded" />
            <p className="text-white-50 mb-4 pe-lg-4">
              Brindando soluciones de saneamiento ambiental de primer nivel. Comprometidos con el ecosistema y el desarrollo sostenible de tu empresa.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
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
          <div className="col-lg-3 col-md-5 mb-4 mb-md-0 text-center text-md-start">
            <h5 className="text-white mb-4 fw-bold">Enlaces Rápidos</h5>
            <ul className="list-unstyled mb-0 d-inline-block text-start">
              <li className="mb-2"><Link to="/" className="text-white-50 text-decoration-none hover-white transition-all">Inicio</Link></li>
              <li className="mb-2"><Link to="/nosotros" className="text-white-50 text-decoration-none hover-white transition-all">Nosotros</Link></li>
              <li className="mb-2"><Link to="/servicios" className="text-white-50 text-decoration-none hover-white transition-all">Servicios</Link></li>
              <li className="mb-2"><Link to="/galeria" className="text-white-50 text-decoration-none hover-white transition-all">Galería</Link></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-7 mb-4 mb-md-0 text-center text-md-start">
            <h5 className="text-white mb-4 fw-bold">Contacto</h5>
            <ul className="list-unstyled mb-0 text-white-50 d-inline-block text-start">
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-geo-alt-fill text-success me-3 mt-1"></i>
                <span>Mza. C Lote. 16 Santo Domingo Etapa 12</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-telephone-fill text-success me-3"></i>
                <span>+51 984 654 112</span>
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
  );
};

export default PublicFooter;
