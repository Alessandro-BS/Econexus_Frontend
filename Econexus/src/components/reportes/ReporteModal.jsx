import { useState, useEffect } from 'react';
import './ReportesPage.css';

function ReporteModal({ show, onClose, onSave, reporteToEdit }) {
  const initialState = {
    fecha_registro: '',
    cliente_nombre: '',
    tipo_servicio: '',
    descripcion: '',
    cantidad: '',
    unidad_medida: '',
    estado: 'PENDIENTE',
  };

  const [formData, setFormData] = useState(initialState);
  const isEditMode = !!reporteToEdit;

  useEffect(() => {
    if (show) {
      if (reporteToEdit) {
        setFormData(reporteToEdit);
      } else {
        // Prellenar fecha actual al crear nuevo
        const today = new Date().toISOString().split('T')[0];
        setFormData({ ...initialState, fecha_registro: today });
      }
    }
  }, [show, reporteToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!show) return null;

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
                  <label className="form-label eco-label">Cliente</label>
                  <input
                    type="text"
                    name="cliente_nombre"
                    className="form-control eco-input"
                    value={formData.cliente_nombre}
                    onChange={handleChange}
                    placeholder="Ej. Minera Horizonte Dorado S.A."
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label eco-label">Tipo de Servicio</label>
                  <input
                    type="text"
                    name="tipo_servicio"
                    className="form-control eco-input"
                    value={formData.tipo_servicio}
                    onChange={handleChange}
                    placeholder="Ej. Recolección de Residuos Peligrosos"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label eco-label">Descripción del Residuo</label>
                  <input
                    type="text"
                    name="descripcion"
                    className="form-control eco-input"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Ej. Aceite usado, Baterías..."
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label eco-label">Cantidad</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cantidad"
                    className="form-control eco-input"
                    value={formData.cantidad}
                    onChange={handleChange}
                    placeholder="Ej. 150"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label eco-label">Unidad de Medida</label>
                  <input
                    type="text"
                    name="unidad_medida"
                    className="form-control eco-input"
                    value={formData.unidad_medida}
                    onChange={handleChange}
                    placeholder="Ej. Kg, Ton, Litros..."
                    required
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
              <button type="submit" className="btn eco-btn-save">
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
