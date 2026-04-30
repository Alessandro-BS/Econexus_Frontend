import { useState } from 'react';
import './ReportesPage.css';

const getInitialState = () => ({
  cliente_id: '',
  cliente_nombre: '',
  tipo_servicio: '',
  descripcion: '',
  fecha: new Date().toISOString().split('T')[0],
  monto: '',
  estado: 'PENDIENTE',
});

function ServicioModal({ show, clientes = [], onClose, onSave }) {
  const [formData, setFormData] = useState(getInitialState);
  const [submitted, setSubmitted] = useState(false);

  if (!show) return null;

  const clientesDisponibles = clientes.filter((cliente) => cliente.estado !== 'INACTIVO');

  const errors = {
    cliente_id: !formData.cliente_id,
    tipo_servicio: !formData.tipo_servicio.trim(),
    descripcion: !formData.descripcion.trim(),
    fecha: !formData.fecha,
    monto: !formData.monto || Number(formData.monto) <= 0,
    estado: !formData.estado,
  };

  const hasErrors = Object.values(errors).some(Boolean);

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
    setSubmitted(true);

    if (hasErrors) return;

    onSave({
      ...formData,
      cliente_id: Number(formData.cliente_id),
      monto: Number(formData.monto),
    });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content eco-modal">
          <div className="modal-header eco-modal-header">
            <div className="modal-header-icon">
              <i className="bi bi-briefcase-fill"></i>
            </div>
            <h5 className="modal-title">Agregar Servicio</h5>
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
                  Primero registra un cliente activo para agregar servicios.
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label eco-label">
                    Cliente <span className="text-danger">*</span>
                  </label>
                  <select
                    name="cliente_id"
                    className={`form-select eco-input ${submitted && errors.cliente_id ? 'is-invalid' : ''}`}
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
                  {submitted && errors.cliente_id && (
                    <div className="invalid-feedback">Selecciona un cliente.</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">
                    Tipo de Servicio <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="tipo_servicio"
                    className={`form-control eco-input ${submitted && errors.tipo_servicio ? 'is-invalid' : ''}`}
                    value={formData.tipo_servicio}
                    onChange={handleChange}
                    placeholder="Ej. Recoleccion de residuos peligrosos"
                    required
                  />
                  {submitted && errors.tipo_servicio && (
                    <div className="invalid-feedback">Ingresa el tipo de servicio.</div>
                  )}
                </div>

                <div className="col-12">
                  <label className="form-label eco-label">
                    Descripcion <span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="descripcion"
                    className={`form-control eco-input ${submitted && errors.descripcion ? 'is-invalid' : ''}`}
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Detalle del servicio ambiental realizado"
                    rows="3"
                    required
                  ></textarea>
                  {submitted && errors.descripcion && (
                    <div className="invalid-feedback">Ingresa una descripcion.</div>
                  )}
                </div>

                <div className="col-md-4">
                  <label className="form-label eco-label">
                    Fecha <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    className={`form-control eco-input ${submitted && errors.fecha ? 'is-invalid' : ''}`}
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                  {submitted && errors.fecha && (
                    <div className="invalid-feedback">Selecciona una fecha.</div>
                  )}
                </div>

                <div className="col-md-4">
                  <label className="form-label eco-label">
                    Monto <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text eco-input border-end-0 bg-light">S/.</span>
                    <input
                      type="number"
                      name="monto"
                      min="0"
                      step="0.01"
                      className={`form-control eco-input border-start-0 ${submitted && errors.monto ? 'is-invalid' : ''}`}
                      value={formData.monto}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                    {submitted && errors.monto && (
                      <div className="invalid-feedback">Ingresa un monto mayor a 0.</div>
                    )}
                  </div>
                </div>

                <div className="col-md-4">
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
              </div>
            </div>

            <div className="modal-footer eco-modal-footer">
              <button type="button" className="btn btn-outline-secondary eco-btn-cancel" onClick={onClose}>
                <i className="bi bi-x-lg me-1"></i>Cancelar
              </button>
              <button type="submit" className="btn eco-btn-save" disabled={clientesDisponibles.length === 0}>
                <i className="bi bi-save me-2"></i>Guardar Servicio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServicioModal;
