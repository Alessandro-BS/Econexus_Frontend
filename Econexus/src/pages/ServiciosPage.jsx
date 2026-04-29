import React from 'react';
import { Link } from 'react-router-dom';

const ServiciosPage = () => {
  return (
    <div className="servicios-detalle">
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <Link to="/" className="btn btn-outline-success rounded-pill px-4">
            
          </Link>
          <span className="fw-bold text-success">Econexus | Portafolio</span>
        </div>
      </nav>
      <header className="bg-success text-white py-5 text-center">
        <h1 className="display-4 fw-bold">Nuestros Servicios</h1>
      </header>
    </div>
  );
};
export default ServiciosPage;