import { useState, useMemo } from 'react';
import './ReportesPage.css';

function ReporteTable({ reportes, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [clienteFilter, setClienteFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const clientesOptions = useMemo(() => {
    return [...new Set(reportes.map((r) => r.cliente_nombre).filter(Boolean))].sort();
  }, [reportes]);

  const tiposOptions = useMemo(() => {
    return [...new Set(reportes.map((r) => r.tipo_servicio).filter(Boolean))].sort();
  }, [reportes]);

  const filteredReportes = useMemo(() => {
    return reportes.filter((r) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        (r.cliente_nombre && r.cliente_nombre.toLowerCase().includes(term)) ||
        (r.tipo_servicio && r.tipo_servicio.toLowerCase().includes(term)) ||
        (r.descripcion && r.descripcion.toLowerCase().includes(term)) ||
        (r.estado && r.estado.toLowerCase().includes(term)) ||
        (r.unidad_medida && r.unidad_medida.toLowerCase().includes(term)) ||
        (r.fecha_registro && r.fecha_registro.includes(term)) ||
        (r.cantidad && String(r.cantidad).includes(term));

      const matchesEstado = !estadoFilter || r.estado === estadoFilter;
      const matchesCliente = !clienteFilter || r.cliente_nombre === clienteFilter;
      const matchesTipo = !tipoFilter || r.tipo_servicio === tipoFilter;
      const matchesFechaDesde = !fechaDesde || r.fecha_registro >= fechaDesde;
      const matchesFechaHasta = !fechaHasta || r.fecha_registro <= fechaHasta;

      return (
        matchesSearch &&
        matchesEstado &&
        matchesCliente &&
        matchesTipo &&
        matchesFechaDesde &&
        matchesFechaHasta
      );
    });
  }, [reportes, searchTerm, estadoFilter, clienteFilter, tipoFilter, fechaDesde, fechaHasta]);

  const totalPages = Math.ceil(filteredReportes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReportes = filteredReportes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const updateFilter = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setEstadoFilter('');
    setClienteFilter('');
    setTipoFilter('');
    setFechaDesde('');
    setFechaHasta('');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm || estadoFilter || clienteFilter || tipoFilter || fechaDesde || fechaHasta;

  const getEstadoClass = (estado) => {
    if (!estado) return 'estado-pendiente';
    const est = estado.toUpperCase();
    if (est === 'CUMPLIDO') return 'estado-cumplido';
    if (est === 'EN PROCESO') return 'estado-proceso';
    if (est === 'OBSERVADO') return 'estado-observado';
    return 'estado-pendiente';
  };

  return (
    <div className="reportes-table-wrapper animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="table-search-bar">
        <div className="table-search-container">
          <i className="bi bi-search table-search-icon"></i>
          <input
            type="text"
            className="table-search-input"
            placeholder="Buscar por cliente, servicio, descripcion, cantidad o estado..."
            value={searchTerm}
            onChange={updateFilter(setSearchTerm)}
          />
        </div>
        <div className="table-actions">
          <span className="table-result-count">
            {filteredReportes.length} resultados
          </span>
        </div>
      </div>

      <div className="table-filters">
        <select className="table-filter-input" value={clienteFilter} onChange={updateFilter(setClienteFilter)}>
          <option value="">Todos los clientes</option>
          {clientesOptions.map((cliente) => (
            <option key={cliente} value={cliente}>
              {cliente}
            </option>
          ))}
        </select>

        <select className="table-filter-input" value={tipoFilter} onChange={updateFilter(setTipoFilter)}>
          <option value="">Todos los servicios</option>
          {tiposOptions.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        <select className="table-filter-input" value={estadoFilter} onChange={updateFilter(setEstadoFilter)}>
          <option value="">Todos los estados</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="EN PROCESO">EN PROCESO</option>
          <option value="CUMPLIDO">CUMPLIDO</option>
          <option value="OBSERVADO">OBSERVADO</option>
        </select>

        <input
          type="date"
          className="table-filter-input"
          value={fechaDesde}
          onChange={updateFilter(setFechaDesde)}
          aria-label="Fecha desde"
        />

        <input
          type="date"
          className="table-filter-input"
          value={fechaHasta}
          onChange={updateFilter(setFechaHasta)}
          aria-label="Fecha hasta"
        />

        <button
          type="button"
          className="btn-filter-clear"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
        >
          Limpiar
        </button>
      </div>

      <div className="table-responsive">
        <table className="reportes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FECHA</th>
              <th>CLIENTE</th>
              <th>TIPO SERVICIO</th>
              <th>DESCRIPCION</th>
              <th>CANT.</th>
              <th>U.M.</th>
              <th>ESTADO</th>
              <th className="text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {currentReportes.length > 0 ? (
              currentReportes.map((reporte) => (
                <tr key={reporte.id}>
                  <td className="fw-medium text-muted">
                    {String(reporte.id).padStart(2, '0')}
                  </td>
                  <td>{reporte.fecha_registro}</td>
                  <td className="fw-semibold text-dark">{reporte.cliente_nombre}</td>
                  <td>{reporte.tipo_servicio}</td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }} title={reporte.descripcion}>
                    {reporte.descripcion}
                  </td>
                  <td>{reporte.cantidad}</td>
                  <td>{reporte.unidad_medida}</td>
                  <td>
                    <span className={`estado-badge ${getEstadoClass(reporte.estado)}`}>
                      {reporte.estado}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-action-edit"
                        title="Editar Reporte"
                        onClick={() => onEdit(reporte)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn-action btn-action-delete"
                        title="Eliminar Reporte"
                        onClick={() => onDelete(reporte)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-muted">
                  No se encontraron reportes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="table-pagination">
          <span className="pagination-info">
            Mostrando {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredReportes.length)} de{' '}
            {filteredReportes.length}
          </span>
          <div className="pagination-controls">
            <button
              className="btn-page"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`btn-page ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn-page"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReporteTable;
