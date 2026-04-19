import '../../components/clientes/ClientesPage.css';

const pages = {
  dashboard: { icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
  proveedores: { icon: 'bi-truck', label: 'Proveedores' },
  reportes: { icon: 'bi-clipboard2-data-fill', label: 'Reportes' },
  normativas: { icon: 'bi-journal-bookmark-fill', label: 'Normativas' },
  ventas: { icon: 'bi-cash-stack', label: 'Ventas' },
};

/**
 * Página placeholder para secciones aún no implementadas.
 */
function PlaceholderPage({ section }) {
  const config = pages[section] || {
    icon: 'bi-gear-fill',
    label: section,
  };

  return (
    <div className="placeholder-page animate-fade-in-up">
      <div className="placeholder-icon">
        <i className={`bi ${config.icon}`}></i>
      </div>
      <h2 className="placeholder-title">{config.label}</h2>
      <p className="placeholder-text">
        Esta sección se encuentra en desarrollo. Próximamente estará disponible
        con todas sus funcionalidades.
      </p>
      <span
        className="eco-badge-active mt-3"
        style={{ fontSize: '0.82rem', padding: '6px 16px' }}
      >
        <i className="bi bi-code-slash me-1"></i>
        En Desarrollo
      </span>
    </div>
  );
}

export default PlaceholderPage;
