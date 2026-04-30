import { useState, useMemo } from 'react';

/**
 * Tabla de clientes con búsqueda, paginación y acciones.
 */
function ClienteTable({ clientes, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const currentUserStr = localStorage.getItem('eco_current_user');
  let userRole = 'OPERADOR';
  try {
    if (currentUserStr) {
      const user = JSON.parse(currentUserStr);
      if (user && user.rol) userRole = user.rol;
    }
  } catch (error) {}

  // Filtrar clientes por búsqueda
  const filteredClientes = useMemo(() => {
    if (!searchTerm.trim()) return clientes;
    const term = searchTerm.toLowerCase();
    return clientes.filter(
      (c) =>
        c.razon_social.toLowerCase().includes(term) ||
        c.ruc.includes(term) ||
        c.contacto_principal.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term)
    );
  }, [clientes, searchTerm]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredClientes.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClientes = filteredClientes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Resetear a página 1 cuando cambia el término de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generar array de páginas para la paginación
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="clientes-table-wrapper animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      {/* Barra de búsqueda */}
      <div className="table-search-bar">
        <div className="table-search-container">
          <i className="bi bi-search table-search-icon"></i>
          <input
            type="text"
            className="table-search-input"
            placeholder="Buscar por razón social, RUC, contacto o email..."
            value={searchTerm}
            onChange={handleSearchChange}
            id="search-clientes"
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
        <span className="table-result-count">
          {filteredClientes.length} resultado{filteredClientes.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-hover clientes-table" id="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Razón Social</th>
              <th>RUC</th>
              <th>Contacto Principal</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClientes.length > 0 ? (
              paginatedClientes.map((cliente) => (
                <tr key={cliente.id} className="table-row-animated">
                  <td className="td-id">
                    <span className="id-badge">{String(cliente.id).padStart(2, '0')}</span>
                  </td>
                  <td className="td-razon-social">
                    <div className="cell-main">{cliente.razon_social}</div>
                    {cliente.direccion && (
                      <div className="cell-sub text-truncate" style={{ maxWidth: '240px' }}>
                        <i className="bi bi-geo-alt me-1"></i>
                        {cliente.direccion}
                      </div>
                    )}
                  </td>
                  <td>
                    <code className="ruc-code">{cliente.ruc}</code>
                  </td>
                  <td>{cliente.contacto_principal}</td>
                  <td>
                    <span className="phone-text">
                      <i className="bi bi-telephone me-1"></i>
                      {cliente.telefono}
                    </span>
                  </td>
                  <td>
                    <a
                      href={`mailto:${cliente.email}`}
                      className="email-link"
                    >
                      {cliente.email}
                    </a>
                  </td>
                  <td>
                    <span
                      className={
                        cliente.estado === 'ACTIVO'
                          ? 'eco-badge-active'
                          : 'eco-badge-inactive'
                      }
                    >
                      {cliente.estado}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-action btn-action-edit"
                        onClick={() => onEdit(cliente)}
                        title="Editar cliente"
                        id={`btn-edit-${cliente.id}`}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      {userRole !== 'OPERADOR' && (
                        <button
                          className="btn btn-sm btn-action btn-action-delete"
                          onClick={() => onDelete(cliente)}
                          title="Eliminar cliente"
                          id={`btn-delete-${cliente.id}`}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <div className="empty-state">
                    <i className="bi bi-inbox empty-state-icon"></i>
                    <p className="empty-state-text">
                      {searchTerm
                        ? 'No se encontraron clientes con ese criterio de búsqueda.'
                        : 'No hay clientes registrados aún.'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="table-pagination">
          <span className="pagination-info">
            Mostrando {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, filteredClientes.length)} de{' '}
            {filteredClientes.length}
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>
              {pageNumbers.map((num) => (
                <li
                  key={num}
                  className={`page-item ${currentPage === num ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(num)}
                  >
                    {num}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default ClienteTable;
