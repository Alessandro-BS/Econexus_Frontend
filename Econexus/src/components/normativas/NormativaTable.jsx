import { useState, useMemo } from 'react';

function NormativaTable({ normativas }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredNormativas = useMemo(() => {
    if (!searchTerm.trim()) return normativas;
    const term = searchTerm.toLowerCase();

    return normativas.filter((n) =>
      n.codigo.toLowerCase().includes(term) ||
      n.titulo.toLowerCase().includes(term) ||
      (n.descripcion && n.descripcion.toLowerCase().includes(term)) ||
      n.entidad_emisora.toLowerCase().includes(term) ||
      n.estado.toLowerCase().includes(term)
    );
  }, [normativas, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredNormativas.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNormativas = filteredNormativas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className="normativas-table-wrapper animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="table-search-bar">
        <div className="table-search-container">
          <i className="bi bi-search table-search-icon"></i>
          <input
            type="text"
            className="table-search-input"
            placeholder="Buscar por código, título, entidad o estado..."
            value={searchTerm}
            onChange={handleSearchChange}
            id="search-normativas"
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
          {filteredNormativas.length} resultado{filteredNormativas.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover normativas-table" id="normativas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Título oficial</th>
              <th>Entidad emisora</th>
              <th>Fecha publicación</th>
              <th>Estado</th>
              <th>Documento</th>
            </tr>
          </thead>
          <tbody>
            {paginatedNormativas.length > 0 ? (
              paginatedNormativas.map((normativa) => (
                <tr key={normativa.id} className="table-row-animated">
                  <td className="td-id">
                    <span className="id-badge">{String(normativa.id).padStart(2, '0')}</span>
                  </td>
                  <td className="td-codigo">
                    <div className="cell-main">{normativa.codigo}</div>
                    <div className="cell-sub text-truncate">{normativa.descripcion}</div>
                  </td>
                  <td>{normativa.titulo}</td>
                  <td>{normativa.entidad_emisora}</td>
                  <td>{normativa.fecha_publicacion}</td>
                  <td>
                    <span
                      className={
                        normativa.estado === 'VIGENTE'
                          ? 'eco-badge-active'
                          : 'eco-badge-inactive'
                      }
                    >
                      {normativa.estado}
                    </span>
                  </td>
                  <td>
                    {normativa.url_documento ? (
                      <a
                        href={normativa.url_documento}
                        target="_blank"
                        rel="noreferrer"
                        className="table-link"
                      >
                        Ver documento
                      </a>
                    ) : (
                      <span className="table-link-disabled">Sin enlace</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <div className="empty-state">
                    <i className="bi bi-inbox empty-state-icon"></i>
                    <p className="empty-state-text">
                      {searchTerm
                        ? 'No se encontraron normativas con ese criterio de búsqueda.'
                        : 'No hay normativas registradas aún.'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="table-pagination">
          <span className="pagination-info">
            Mostrando {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, filteredNormativas.length)} de{' '}
            {filteredNormativas.length}
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>
              {pageNumbers.map((num) => (
                <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => goToPage(num)}>
                    {num}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
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

export default NormativaTable;
