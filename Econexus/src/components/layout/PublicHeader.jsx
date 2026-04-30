import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/econexus-sin-fondo.png';

const PublicHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Econexus Logo" height="50" className="me-2" />
        </Link>
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
              <NavLink className={({ isActive }) => `nav-link fw-medium px-3 ${isActive ? 'active text-success' : ''}`} to="/" end>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium px-3 ${isActive ? 'active text-success' : ''}`} to="/nosotros">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium px-3 ${isActive ? 'active text-success' : ''}`} to="/servicios">Servicios</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium px-3 ${isActive ? 'active text-success' : ''}`} to="/galeria">Galería</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium px-3 ${isActive ? 'active text-success' : ''}`} to="/contacto">Contáctanos</NavLink>
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
  );
};

export default PublicHeader;
