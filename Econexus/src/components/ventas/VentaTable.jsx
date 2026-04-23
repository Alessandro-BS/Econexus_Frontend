import { useState, useMemo } from 'react';

/**
 * Tabla de Ventas (Órdenes de Servicio) con búsqueda y paginación.
 */
function VentaTable({ ventas, onEdit, onViewPdf }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar ventas por búsqueda
  const filteredVentas = useMemo(() => {
    if (!searchTerm.trim()) return ventas;
    const term = searchTerm.toLowerCase();
    return ventas.filter(
      (v) =>
        v.numero_orden.toLowerCase().includes(term) ||
        v.cliente_nombre.toLowerCase().includes(term) ||
        v.estado_pago.toLowerCase().includes(term)
    );
  }, [ventas, searchTerm]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredVentas.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVentas = filteredVentas.slice(
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
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Formatear moneda (Sol Peruano)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Badge de estado
  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'PAGADO':
        return <span className="eco-badge-pagado">PAGADO</span>;
      case 'PENDIENTE':
        return <span className="eco-badge-pendiente">PENDIENTE</span>;
      case 'ANULADO':
        return <span className="eco-badge-anulado">ANULADO</span>;
      default:
        return <span>{estado}</span>;
    }
  };

  return (
    <div className="ventas-table-wrapper animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      {/* Barra de búsqueda */}
      <div className="table-search-bar">
        <div className="table-search-container">
          <i className="bi bi-search table-search-icon"></i>
          <input
            type="text"
            className="table-search-input"
            placeholder="Buscar por N° de orden, cliente o estado..."
            value={searchTerm}
            onChange={handleSearchChange}
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
          {filteredVentas.length} resultado{filteredVentas.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-hover ventas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>N° Orden</th>
              <th>Fecha Emisión</th>
              <th>Cliente</th>
              <th>Monto Total</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVentas.length > 0 ? (
              paginatedVentas.map((venta) => (
                <tr key={venta.id} className="table-row-animated">
                  <td className="td-id">
                    <span className="id-badge">{String(venta.id).padStart(2, '0')}</span>
                  </td>
                  <td>
                    <span className="orden-code">{venta.numero_orden}</span>
                  </td>
                  <td>{venta.fecha_emision}</td>
                  <td>
                    <div className="cell-main">{venta.cliente_nombre}</div>
                  </td>
                  <td>
                    <span className="monto-text">{formatCurrency(venta.monto_total)}</span>
                  </td>
                  <td>{getStatusBadge(venta.estado_pago)}</td>
                  <td className="text-center">
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-action btn-action-view"
                        onClick={() => onEdit(venta, true)}
                        title="Ver detalle"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-action btn-action-edit"
                        onClick={() => onEdit(venta, false)}
                        title="Editar estado"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-action btn-action-pdf"
                        onClick={() => onViewPdf(venta)}
                        title="Ver PDF adjunto"
                        disabled={!venta.pdf_base64 && venta.id <= 5} // Seed might not have PDF
                      >
                        <i className="bi bi-file-earmark-pdf-fill"></i>
                      </button>
                    </div>
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
                        ? 'No se encontraron órdenes con ese criterio.'
                        : 'No hay órdenes de servicio registradas aún.'}
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
            {Math.min(startIndex + itemsPerPage, filteredVentas.length)} de{' '}
            {filteredVentas.length}
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

export default VentaTable;
