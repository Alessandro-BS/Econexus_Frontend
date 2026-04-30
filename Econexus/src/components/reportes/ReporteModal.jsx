import { useEffect, useState } from 'react';
import './ReportesPage.css';

const initialState = {
  fecha_registro: '',
  servicio_id: '',
  cliente_id: '',
  cliente_nombre: '',
  tipo_servicio: '',
  descripcion: '',
  cantidad: '',
  unidad_medida: '',
  estado: 'PENDIENTE',
};

function ReporteModal({ show, servicios = [], onClose, onSave, reporteToEdit }) {
  const [formData, setFormData] = useState(initialState);
  const isEditMode = !!reporteToEdit;

  useEffect(() => {
    if (!show) return;

    if (reporteToEdit) {
      setFormData({
        ...initialState,
        ...reporteToEdit,
        servicio_id: reporteToEdit.servicio_id || '',
      });
    } else {
      setFormData({
        ...initialState,
        fecha_registro: new Date().toISOString().split('T')[0],
      });
    }
  }, [show, reporteToEdit]);

  if (!show) return null;

  const serviciosDisponibles = servicios;

  const applyServicio = (servicioId) => {
    const servicio = servicios.find((item) => item.id === Number(servicioId));

    if (!servicio) {
      setFormData((prev) => ({
        ...prev,
        servicio_id: '',
        cliente_id: '',
        cliente_nombre: '',
        tipo_servicio: '',
        descripcion: '',
        cantidad: '',
        unidad_medida: '',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      servicio_id: servicio.id,
      cliente_id: servicio.cliente_id,
      cliente_nombre: servicio.cliente_nombre,
      tipo_servicio: servicio.tipo_servicio,
      descripcion: servicio.descripcion,
      cantidad: servicio.cantidad,
      unidad_medida: servicio.unidad_medida,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'servicio_id') {
      applyServicio(value);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.servicio_id) return;

    onSave({
      ...formData,
      servicio_id: Number(formData.servicio_id),
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
              {serviciosDisponibles.length === 0 && (
                <div className="alert alert-warning mb-3" role="alert">
                  Primero registra un servicio para poder generar reportes.
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
                    Servicio <span className="text-danger">*</span>
                  </label>
                  <select
                    name="servicio_id"
                    className="form-select eco-input"
                    value={formData.servicio_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un servicio...</option>
                    {serviciosDisponibles.map((servicio) => (
                      <option key={servicio.id} value={servicio.id}>
                        {servicio.cliente_nombre} - {servicio.tipo_servicio}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Cliente</label>
                  <input
                    type="text"
                    className="form-control eco-input"
                    value={formData.cliente_nombre}
                    placeholder="Se completa al seleccionar un servicio"
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Tipo de Servicio</label>
                  <input
                    type="text"
                    className="form-control eco-input"
                    value={formData.tipo_servicio}
                    placeholder="Se completa al seleccionar un servicio"
                    readOnly
                  />
                </div>

                <div className="col-12">
                  <label className="form-label eco-label">Descripción del Servicio</label>
                  <input
                    type="text"
                    className="form-control eco-input"
                    value={formData.descripcion}
                    placeholder="Se completa al seleccionar un servicio"
                    readOnly
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label eco-label">Cantidad</label>
                  <input
                    type="number"
                    className="form-control eco-input"
                    value={formData.cantidad}
                    placeholder="0"
                    readOnly
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label eco-label">Unidad de Medida</label>
                  <input
                    type="text"
                    className="form-control eco-input"
                    value={formData.unidad_medida}
                    placeholder="Kg, TN, Litros..."
                    readOnly
                  />
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
              <button type="submit" className="btn eco-btn-save" disabled={serviciosDisponibles.length === 0}>
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
