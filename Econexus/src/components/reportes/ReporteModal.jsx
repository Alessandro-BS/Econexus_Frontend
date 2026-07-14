import { useState, useMemo } from 'react';
import useApiCrud from '../../hooks/useApiCrud';
import './ReportesPage.css';

const initialState = {
  fecha_registro: '',
  cliente_id: '',
  cliente_nombre: '',
  tipo_servicio_id: '',
  orden_servicio_id: '',
  descripcion: '',
  cantidad: '',
  unidad_medida: '',
  estado_cumplimiento: 'PENDIENTE',
};

const getInitialState = (reporteToEdit, clientes) => {
  if (!reporteToEdit) {
    return {
      ...initialState,
      fecha_registro: new Date().toISOString().split('T')[0],
    };
  }

  const clienteEncontrado = clientes.find(
    (cliente) =>
      cliente.id === Number(reporteToEdit.cliente_id) ||
      cliente.razon_social === reporteToEdit.cliente_nombre
  );

  return {
    ...initialState,
    ...reporteToEdit,
    cliente_id: clienteEncontrado ? String(clienteEncontrado.id) : '',
    cliente_nombre: clienteEncontrado
      ? clienteEncontrado.razon_social
      : reporteToEdit.cliente_nombre || '',
  };
};

function ReporteModal({ show, clientes = [], onClose, onSave, reporteToEdit }) {
  const [formData, setFormData] = useState(() => getInitialState(reporteToEdit, clientes));
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isEditMode = !!reporteToEdit;
  const { data: tiposServicio, loading: loadingTipos } = useApiCrud('/tipos-servicio');

  if (!show) return null;

  const clientesDisponibles = clientes.filter((cliente) => cliente.estado !== 'INACTIVO');

  const filteredClientes = useMemo(() => {
    const term = formData.cliente_nombre.trim().toLowerCase();
    if (!term) return clientesDisponibles.slice(0, 8);
    return clientesDisponibles
      .filter((cliente) => cliente.razon_social.toLowerCase().includes(term))
      .slice(0, 8);
  }, [clientesDisponibles, formData.cliente_nombre]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cliente_nombre') {
      setFormData((prev) => ({ ...prev, cliente_nombre: value }));
      setShowSuggestions(true);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientSelect = (cliente) => {
    setFormData((prev) => ({
      ...prev,
      cliente_id: String(cliente.id),
      cliente_nombre: cliente.razon_social,
    }));
    setShowSuggestions(false);
  };

  const handleClientFocus = () => {
    setShowSuggestions(true);
  };

  const handleClientBlur = () => {
    window.setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cliente_id) return;

    onSave({
      ...formData,
      cliente_id: Number(formData.cliente_id),
      cantidad: Number(formData.cantidad),
      estado_cumplimiento: formData.estado_cumplimiento,
      tipo_servicio_id: Number(formData.tipo_servicio_id),
      orden_servicio_id: formData.orden_servicio_id ? Number(formData.orden_servicio_id) : null
    });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content eco-modal">
          <div className="modal-header eco-modal-header">
            <div className="modal-header-icon">
              <i className={`bi ${isEditMode ? 'bi-pencil-square' : 'bi-file-earmark-plus-fill'}`}></i>
            </div>
            <h5 className="modal-title">
              {isEditMode ? 'Editar Reporte' : 'Generar Nuevo Reporte'}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body eco-modal-body">
              {clientesDisponibles.length === 0 && (
                <div className="alert alert-warning mb-3" role="alert">
                  Primero registra un cliente activo para poder generar reportes.
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label eco-label">Fecha de Registro</label>
                  <input
                    type="date"
                    name="fecha_registro"
                    className="form-control eco-input bg-light"
                    value={formData.fecha_registro}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="col-md-6 position-relative">
                  <label className="form-label eco-label">
                    Cliente <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="cliente_nombre"
                    className="form-control eco-input"
                    value={formData.cliente_nombre}
                    onChange={handleChange}
                    onFocus={handleClientFocus}
                    onBlur={handleClientBlur}
                    placeholder="Escribe el nombre del cliente..."
                    required
                    autoComplete="off"
                  />
                  {showSuggestions && (
                    <ul
                      className="list-group position-absolute w-100 shadow-sm"
                      style={{
                        zIndex: 1100,
                        maxHeight: '260px',
                        overflowY: 'auto',
                        background: '#fff',
                        borderRadius: '0 0 .35rem .35rem',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        marginTop: '0.12rem',
                      }}
                    >
                      {filteredClientes.length > 0 ? (
                        filteredClientes.map((cliente) => (
                          <li
                            key={cliente.id}
                            className="list-group-item list-group-item-action"
                            style={{ cursor: 'pointer' }}
                            onMouseDown={() => handleClientSelect(cliente)}
                          >
                            {cliente.razon_social}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">No se encontró cliente.</li>
                      )}
                    </ul>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Tipo de Servicio <span className="text-danger">*</span></label>
                  <select
                    name="tipo_servicio_id"
                    className="form-select eco-input"
                    value={formData.tipo_servicio_id}
                    onChange={handleChange}
                    required
                    disabled={loadingTipos}
                  >
                    <option value="">Seleccione un servicio</option>
                    {tiposServicio && tiposServicio.map(tipo => (
                      <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                    ))}
                  </select>
                </div>

                {/* Orden de Servicio Oculta */}
                <input type="hidden" name="orden_servicio_id" value={formData.orden_servicio_id || ''} />

                <div className="col-md-6">
                  <label className="form-label eco-label">Estado Cumplimiento</label>
                  <select
                    name="estado_cumplimiento"
                    className="form-select eco-input"
                    value={formData.estado_cumplimiento}
                    onChange={handleChange}
                    required
                  >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="EN_PROCESO">EN_PROCESO</option>
                    <option value="CUMPLIDO">CUMPLIDO</option>
                    <option value="OBSERVADO">OBSERVADO</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label eco-label">Descripción del Servicio</label>
                  <textarea
                    name="descripcion"
                    className="form-control eco-input"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Detalle del servicio ambiental"
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Cantidad</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="cantidad"
                    className="form-control eco-input"
                    value={formData.cantidad}
                    onChange={handleChange}
                    placeholder="Ej. 150"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Unidad de Medida</label>
                  <select
                    name="unidad_medida"
                    className="form-select eco-input"
                    value={formData.unidad_medida}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="KG">KG</option>
                    <option value="LITROS">LITROS</option>
                    <option value="M2">M2</option>
                    <option value="UNIDAD">UNIDAD</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer eco-modal-footer">
              <button type="button" className="btn btn-outline-secondary eco-btn-cancel" onClick={onClose}>
                <i className="bi bi-x-lg me-1"></i>Cancelar
              </button>
              <button type="submit" className="btn eco-btn-save" disabled={clientesDisponibles.length === 0}>
                <i className="bi bi-save me-2"></i>Guardar Reporte
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReporteModal;
