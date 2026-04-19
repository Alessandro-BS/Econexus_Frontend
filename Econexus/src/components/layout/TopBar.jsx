import './TopBar.css';

function TopBar({ onToggleSidebar }) {
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
        <div className="topbar-search">
          <i className="bi bi-search topbar-search-icon"></i>
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Buscar..."
            id="global-search"
          />
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
