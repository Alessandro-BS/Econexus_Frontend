import { useState } from 'react';
import './ReportesPage.css';

const initialState = {
  fecha_registro: '',
  cliente_id: '',
  cliente_nombre: '',
  tipo_servicio: '',
  descripcion: '',
  cantidad: '',
  unidad_medida: '',
  estado: 'PENDIENTE',
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
  const isEditMode = !!reporteToEdit;

  if (!show) return null;

  const clientesDisponibles = clientes.filter((cliente) => cliente.estado !== 'INACTIVO');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cliente_id') {
      const cliente = clientesDisponibles.find((item) => item.id === Number(value));
      setFormData((prev) => ({
        ...prev,
        cliente_id: value,
        cliente_nombre: cliente ? cliente.razon_social : '',
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cliente_id) return;

    onSave({
      ...formData,
      cliente_id: Number(formData.cliente_id),
      cantidad: Number(formData.cantidad),
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
                    className="form-control eco-input"
                    value={formData.fecha_registro}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">
                    Cliente <span className="text-danger">*</span>
                  </label>
                  <select
                    name="cliente_id"
                    className="form-select eco-input"
                    value={formData.cliente_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un cliente...</option>
                    {clientesDisponibles.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.razon_social}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Tipo de Servicio</label>
                  <input
                    type="text"
                    name="tipo_servicio"
                    className="form-control eco-input"
                    value={formData.tipo_servicio}
                    onChange={handleChange}
                    placeholder="Ej. Recoleccion de residuos peligrosos"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Estado</label>
                  <select
                    name="estado"
                    className="form-select eco-input"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="EN PROCESO">EN PROCESO</option>
                    <option value="CUMPLIDO">CUMPLIDO</option>
                    <option value="OBSERVADO">OBSERVADO</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label eco-label">Descripcion del Servicio</label>
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
                  <input
                    type="text"
                    name="unidad_medida"
                    className="form-control eco-input"
                    value={formData.unidad_medida}
                    onChange={handleChange}
                    placeholder="Kg, TN, Litros, Unidades..."
                    required
                  />
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
