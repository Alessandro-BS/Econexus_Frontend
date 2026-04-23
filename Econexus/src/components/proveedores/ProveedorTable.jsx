import { useState, useMemo } from 'react';

/**
 * Tabla de proveedores con búsqueda, filtros y paginación.
 */
function ProveedorTable({ proveedores, onEdit, onDelete, onReactivate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar proveedores por búsqueda y estado
  const filteredProveedores = useMemo(() => {
    let filtered = proveedores;

    // Filtrar por estado
    if (filterEstado !== 'TODOS') {
      filtered = filtered.filter((p) => p.estado === filterEstado);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.razonSocial.toLowerCase().includes(term) ||
          p.ruc.includes(term) ||
          p.contactoPrincipal.toLowerCase().includes(term) ||
          p.email.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [proveedores, searchTerm, filterEstado]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredProveedores.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProveedores = filteredProveedores.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterEstado(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getTipoServicioLabel = (tipo) => {
    const tipos = {
      SOLIDO_PELIGROSO: 'Sólido Peligroso',
      SOLIDO_NO_PELIGROSO: 'Sólido No Peligroso',
      LIQUIDO: 'Líquido',
      FUMIGACION: 'Fumigación',
      DESINFECCION: 'Desinfección',
      DESINSECTACION: 'Desinsectación',
    };
    return tipos[tipo] || tipo;
  };

  const getTipoServicioBadgeClass = (tipo) => {
    const clases = {
      SOLIDO_PELIGROSO: 'eco-badge-servicio-rojo',
      SOLIDO_NO_PELIGROSO: 'eco-badge-servicio-naranja',
      LIQUIDO: 'eco-badge-servicio-azul',
      FUMIGACION: 'eco-badge-servicio-verde',
      DESINFECCION: 'eco-badge-servicio-morado',
      DESINSECTACION: 'eco-badge-servicio-celeste',
    };
    return clases[tipo] || '';
  };

  return (
    <div className="proveedores-table-wrapper animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      {/* Barra de búsqueda y filtros */}
      <div className="table-search-bar">
        <div style={{ display: 'flex', gap: '12px', flex: 1, flexWrap: 'wrap' }}>
          <div className="table-search-container" style={{ flex: 1, minWidth: '250px' }}>
            <i className="bi bi-search table-search-icon"></i>
            <input
              type="text"
              className="table-search-input"
              placeholder="Buscar por razón social, RUC, contacto..."
              value={searchTerm}
              onChange={handleSearchChange}
              id="search-proveedores"
            />
            {searchTerm && (
              <button
                className="table-search-clear"
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                title="Limpiar búsqueda"
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>

          {/* Filtro de estado */}
          <select
            className="form-select eco-filter-select"
            value={filterEstado}
            onChange={handleFilterChange}
            id="filter-estado"
            style={{ minWidth: '120px' }}
          >
            <option value="TODOS">Todos</option>
            <option value="ACTIVO">Activos</option>
            <option value="INACTIVO">Inactivos</option>
          </select>
        </div>
        <span className="table-result-count">
          {filteredProveedores.length} resultado{filteredProveedores.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-hover proveedores-table" id="proveedores-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Razón Social</th>
              <th>RUC</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProveedores.length > 0 ? (
              paginatedProveedores.map((proveedor) => (
                <tr key={proveedor.id} className="table-row-animated">
                  <td className="td-id">
                    <span className="id-badge">{String(proveedor.id).padStart(2, '0')}</span>
                  </td>
                  <td className="td-razon-social">
                    <div className="cell-main">{proveedor.razonSocial}</div>
                    {proveedor.direccion && (
                      <div className="cell-sub text-truncate" style={{ maxWidth: '240px' }}>
                        <i className="bi bi-geo-alt me-1"></i>
                        {proveedor.direccion}
                      </div>
                    )}
                  </td>
                  <td>
                    <code className="ruc-code">{proveedor.ruc}</code>
                  </td>
                  <td>{proveedor.contactoPrincipal}</td>
                  <td>
                    <span className="phone-text">
                      <i className="bi bi-telephone me-1"></i>
                      {proveedor.telefono}
                    </span>
                  </td>
                  <td>
                    <a href={`mailto:${proveedor.email}`} className="email-link">
                      {proveedor.email}
                    </a>
                  </td>
                  <td>
                    <span className={`eco-badge-servicio ${getTipoServicioBadgeClass(proveedor.tipoServicio)}`}>
                      {getTipoServicioLabel(proveedor.tipoServicio)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        proveedor.estado === 'ACTIVO'
                          ? 'eco-badge-active'
                          : 'eco-badge-inactive'
                      }
                    >
                      {proveedor.estado}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-action btn-action-edit"
                        onClick={() => onEdit(proveedor)}
                        title="Editar proveedor"
                        id={`btn-edit-prov-${proveedor.id}`}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      {proveedor.estado === 'ACTIVO' ? (
                        <button
                          className="btn btn-sm btn-action btn-action-delete"
                          onClick={() => onDelete(proveedor)}
                          title="Desactivar proveedor"
                          id={`btn-delete-prov-${proveedor.id}`}
                        >
                          <i className="bi bi-dash-circle-fill"></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-action btn-action-reactivate"
                          onClick={() => onReactivate(proveedor.id)}
                          title="Reactivar proveedor"
                          id={`btn-reactivate-prov-${proveedor.id}`}
                        >
                          <i className="bi bi-arrow-clockwise"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-muted">
                  <i className="bi bi-inbox me-2"></i>
                  No hay proveedores que coincidan con tu búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className="table-pagination">
          <ul className="pagination pagination-sm">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                <i className="bi bi-chevron-left"></i> Anterior
              </button>
            </li>
            {pageNumbers.map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => goToPage(page)}>
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                Siguiente <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default ProveedorTable;
