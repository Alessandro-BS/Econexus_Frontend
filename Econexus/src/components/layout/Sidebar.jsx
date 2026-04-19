import { NavLink } from 'react-router-dom';
import logoPlaceholder from '../../assets/econexus-sin-fondo.png';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
  { path: '/clientes', icon: 'bi-people-fill', label: 'Clientes' },
  { path: '/proveedores', icon: 'bi-truck', label: 'Proveedores' },
  { path: '/reportes', icon: 'bi-clipboard2-data-fill', label: 'Reportes' },
  { path: '/normativas', icon: 'bi-journal-bookmark-fill', label: 'Normativas' },
  { path: '/ventas', icon: 'bi-cash-stack', label: 'Ventas' },
];

function Sidebar() {
  return (
    <aside className="eco-sidebar" id="sidebar">
      {/* Logo */}
      <div className="sidebar-logo-wrapper">
        <div className="sidebar-logo-container">
          <img
            src={logoPlaceholder}
            alt="Logo Econexus"
            className="sidebar-logo"
          />
        </div>
      </div>

      {/* Navegación */}
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="sidebar-nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <i className={`bi ${item.icon} sidebar-nav-icon`}></i>
                <span className="sidebar-nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Cerrar Sesión — abajo */}
      <div className="sidebar-footer">
        <button className="sidebar-logout-btn" id="btn-logout">
          <i className="bi bi-box-arrow-left sidebar-nav-icon"></i>
          <span className="sidebar-nav-label">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
