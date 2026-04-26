import { useState, useMemo } from 'react';

/**
 * Tabla de usuarios con búsqueda, filtro por rol, paginación y acciones.
 */
function UsuarioTable({ usuarios, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [rolFilter, setRolFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar usuarios por búsqueda y rol
  const filteredUsuarios = useMemo(() => {
    let result = usuarios;

    // Filtro de búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (u) =>
          u.nombre_completo.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.telefono.includes(term)
      );
    }

    // Filtro por rol
    if (rolFilter) {
      result = result.filter((u) => u.rol === rolFilter);
    }

    return result;
  }, [usuarios, searchTerm, rolFilter]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredUsuarios.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsuarios = filteredUsuarios.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Resetear a página 1 cuando cambia el término de búsqueda o filtro
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRolFilterChange = (e) => {
    setRolFilter(e.target.value);
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

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Función para obtener la clase del badge según el estado
  const getEstadoBadgeClass = (estado) => {
    return estado === 'ACTIVO'
      ? 'badge bg-success'
      : 'badge bg-danger';
  };

  // Función para obtener la clase del badge según el rol
  const getRolBadgeClass = (rol) => {
    const classes = {
      ADMIN: 'badge bg-primary',
      SUPERVISOR: 'badge bg-info',
      OPERADOR: 'badge bg-warning',
    };
    return classes[rol] || 'badge bg-secondary';
  };

  return (
    <div className="usuarios-table-wrapper animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      {/* Barra de búsqueda y filtro */}
      <div className="table-search-bar">
        <div className="table-search-container">
          <i className="bi bi-search table-search-icon"></i>
          <input
            type="text"
            className="table-search-input"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={handleSearchChange}
            id="search-usuarios"
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

        {/* Filtro por rol */}
        <select
          className="role-filter-select"
          value={rolFilter}
          onChange={handleRolFilterChange}
          id="filter-rol"
        >
          <option value="">Todos los roles</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPERVISOR">Supervisor</option>
          <option value="OPERADOR">Operador</option>
        </select>

        <span className="table-result-count">
          {filteredUsuarios.length} resultado{filteredUsuarios.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-hover usuarios-table" id="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Fecha Creación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsuarios.length > 0 ? (
              paginatedUsuarios.map((usuario) => (
                <tr key={usuario.id} className="table-row-animated">
                  <td>
                    <span className="table-id-badge">{usuario.id}</span>
                  </td>
                  <td className="table-name-cell">
                    <span className="table-name-text">{usuario.nombre_completo}</span>
                  </td>
                  <td>
                    <span className="table-email">{usuario.email}</span>
                  </td>
                  <td>
                    <span className="table-phone">{usuario.telefono}</span>
                  </td>
                  <td>
                    <span className={getRolBadgeClass(usuario.rol)}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td>
                    <span className={getEstadoBadgeClass(usuario.estado)}>
                      {usuario.estado}
                    </span>
                  </td>
                  <td>
                    <span className="table-date">{formatDate(usuario.fecha_creacion)}</span>
                  </td>
                  <td className="text-center">
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-outline-primary action-btn edit-btn"
                        onClick={() => onEdit(usuario)}
                        title="Editar usuario"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger action-btn delete-btn"
                        onClick={() => onDelete(usuario)}
                        title="Eliminar usuario"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted py-4">
                  <i className="bi bi-inbox me-2"></i>
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className="pagination-wrapper">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-double-left"></i>
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>

            {pageNumbers.map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <i className="bi bi-chevron-double-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default UsuarioTable;
