import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

function TopBar({ onToggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({ clientes: [], proveedores: [], ventas: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Cierra el dropdown al hacer clic afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
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
      
      setResults({
        clientes: filteredClientes,
        proveedores: filteredProveedores,
        ventas: filteredVentas
      });
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleResultClick = (path) => {
    navigate(path);
    setShowDropdown(false);
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
          <span className="topbar-greeting-name">Encargado</span>
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
            onFocus={() => { if (searchTerm.trim().length > 0) setShowDropdown(true); }}
          />
          
          {/* Dropdown de resultados */}
          {showDropdown && (results.clientes.length > 0 || results.proveedores.length > 0 || results.ventas.length > 0) && (
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
            </div>
          )}
          {showDropdown && searchTerm.trim().length > 0 && 
           results.clientes.length === 0 && 
           results.proveedores.length === 0 && 
           results.ventas.length === 0 && (
             <div className="search-dropdown">
               <div className="search-no-results">
                 <i className="bi bi-info-circle"></i> No se encontraron resultados
               </div>
             </div>
          )}
        </div>
        <div className="topbar-user-info">
          <div className="topbar-avatar">
            <i className="bi bi-person-fill"></i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
