import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

function TopBar({ onToggleSidebar, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({ clientes: [], proveedores: [], ventas: [], usuarios: [] });
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Obtener usuario actual de localStorage
  useEffect(() => {
    const userFromStorage = localStorage.getItem('eco_current_user');
    if (userFromStorage) {
      setCurrentUser(JSON.parse(userFromStorage));
    }
  }, []);

  // Cierra el dropdown al hacer clic afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim().length > 0) {
      const termLower = term.toLowerCase();
      
      // Obtener datos desde localStorage (usado como mock de API global)
      const clientes = JSON.parse(localStorage.getItem('eco_clientes')) || [];
      const proveedores = JSON.parse(localStorage.getItem('econexus_proveedores')) || [];
      const ventas = JSON.parse(localStorage.getItem('eco_ventas')) || [];
      const usuarios = JSON.parse(localStorage.getItem('eco_usuarios')) || [];
      
      // Filtrar resultados por coincidencias en varios campos
      const filteredClientes = clientes.filter(c => 
        (c.razon_social && c.razon_social.toLowerCase().includes(termLower)) ||
        (c.ruc && c.ruc.toLowerCase().includes(termLower)) ||
        (c.contacto_principal && c.contacto_principal.toLowerCase().includes(termLower))
      ).slice(0, 3); // Limitar a 3 resultados por categoría
      
      const filteredProveedores = proveedores.filter(p => 
        (p.razon_social && p.razon_social.toLowerCase().includes(termLower)) ||
        (p.ruc && p.ruc.toLowerCase().includes(termLower)) ||
        (p.contacto_principal && p.contacto_principal.toLowerCase().includes(termLower))
      ).slice(0, 3);
      
      const filteredVentas = ventas.filter(v => 
        (v.numero_orden && v.numero_orden.toLowerCase().includes(termLower)) ||
        (v.cliente_nombre && v.cliente_nombre.toLowerCase().includes(termLower))
      ).slice(0, 3);

      const filteredUsuarios = usuarios.filter(u => 
        (u.nombre_completo && u.nombre_completo.toLowerCase().includes(termLower)) ||
        (u.email && u.email.toLowerCase().includes(termLower)) ||
        (u.rol && u.rol.toLowerCase().includes(termLower))
      ).slice(0, 3);
      
      setResults({
        clientes: filteredClientes,
        proveedores: filteredProveedores,
        ventas: filteredVentas,
        usuarios: filteredUsuarios
      });
      setShowSearchDropdown(true);
    } else {
      setShowSearchDropdown(false);
    }
  };

  const handleResultClick = (path) => {
    navigate(path);
    setShowSearchDropdown(false);
    setSearchTerm('');
  };

  return (
    <header className="eco-topbar" id="topbar">
      <div className="topbar-left">
        {/* Botón hamburguesa — solo visible en móvil */}
        <button
          className="topbar-hamburger"
          onClick={onToggleSidebar}
          aria-label="Abrir menú"
          id="btn-toggle-sidebar"
        >
          <i className="bi bi-list"></i>
        </button>

        <h2 className="topbar-greeting">
          <span className="topbar-greeting-hi">Bienvenido,</span>{' '}
          <span className="topbar-greeting-name">
            {currentUser ? currentUser.nombre_completo.split(' ')[0] : 'Usuario'}
          </span>
        </h2>
      </div>

      <div className="topbar-right">
        <div className="topbar-search" ref={searchRef}>
          <i className="bi bi-search topbar-search-icon"></i>
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Buscar global..."
            id="global-search"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => { if (searchTerm.trim().length > 0) setShowSearchDropdown(true); }}
          />
          
          {/* Dropdown de resultados */}
          {showSearchDropdown && (results.clientes.length > 0 || results.proveedores.length > 0 || results.ventas.length > 0 || results.usuarios.length > 0) && (
            <div className="search-dropdown">
              {results.clientes.length > 0 && (
                <div className="search-category">
                  <h4 className="search-category-title"><i className="bi bi-people-fill"></i> Clientes</h4>
                  <ul className="search-list">
                    {results.clientes.map(c => (
                      <li key={`c-${c.id}`} onClick={() => handleResultClick('/clientes')}>
                        <span className="search-item-title">{c.razon_social}</span>
                        <span className="search-item-sub">RUC: {c.ruc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {results.proveedores.length > 0 && (
                <div className="search-category">
                  <h4 className="search-category-title"><i className="bi bi-truck-front-fill"></i> Proveedores</h4>
                  <ul className="search-list">
                    {results.proveedores.map(p => (
                      <li key={`p-${p.id}`} onClick={() => handleResultClick('/proveedores')}>
                        <span className="search-item-title">{p.razon_social}</span>
                        <span className="search-item-sub">RUC: {p.ruc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.ventas.length > 0 && (
                <div className="search-category">
                  <h4 className="search-category-title"><i className="bi bi-cash-coin"></i> Órdenes de Venta</h4>
                  <ul className="search-list">
                    {results.ventas.map(v => (
                      <li key={`v-${v.id}`} onClick={() => handleResultClick('/ventas')}>
                        <span className="search-item-title">{v.numero_orden}</span>
                        <span className="search-item-sub">{v.cliente_nombre || 'Sin cliente'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.usuarios.length > 0 && (
                <div className="search-category">
                  <h4 className="search-category-title"><i className="bi bi-person-badge"></i> Usuarios</h4>
                  <ul className="search-list">
                    {results.usuarios.map(u => (
                      <li key={`u-${u.id}`} onClick={() => handleResultClick('/usuarios')}>
                        <span className="search-item-title">{u.nombre_completo}</span>
                        <span className="search-item-sub">{u.email}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {showSearchDropdown && searchTerm.trim().length > 0 && 
           results.clientes.length === 0 && 
           results.proveedores.length === 0 && 
           results.ventas.length === 0 && 
           results.usuarios.length === 0 && (
             <div className="search-dropdown">
               <div className="search-no-results">
                 <i className="bi bi-info-circle"></i> No se encontraron resultados
               </div>
             </div>
          )}
        </div>
        <div className="topbar-user-info" ref={profileRef}>
          <div 
            className="topbar-avatar" 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <i className="bi bi-person-fill"></i>
          </div>
          
          {/* Dropdown de perfil */}
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-dropdown-avatar">
                  <i className="bi bi-person-fill"></i>
                </div>
                <div className="profile-dropdown-info">
                  <span className="profile-name">
                    {currentUser ? currentUser.nombre_completo : 'Usuario'}
                  </span>
                  <span className="profile-role">
                    {currentUser ? currentUser.rol : 'VISITANTE'}
                  </span>
                </div>
              </div>
              <div className="profile-dropdown-divider"></div>
              <button 
                className="profile-dropdown-item text-danger" 
                onClick={() => {
                  setShowProfileDropdown(false);
                  if(onLogout) onLogout();
                }}
              >
                <i className="bi bi-box-arrow-right"></i>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
