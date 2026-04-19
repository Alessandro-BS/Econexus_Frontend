import { useState, useEffect } from 'react';

const emptyForm = {
  razon_social: '',
  ruc: '',
  contacto_principal: '',
  telefono: '',
  email: '',
  direccion: '',
  estado: 'ACTIVO',
};

/**
 * Modal para crear y editar clientes.
 * @param {boolean} show - Visibilidad del modal
 * @param {function} onClose - Cierra el modal
 * @param {function} onSave - Guarda el cliente (nuevo o editado)
 * @param {object|null} clienteToEdit - Si no es null, modo edición
 */
function ClienteModal({ show, onClose, onSave, clienteToEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isEditMode = !!clienteToEdit;

  // Cargar datos al abrir en modo edición
  useEffect(() => {
    if (clienteToEdit) {
      setFormData({
        razon_social: clienteToEdit.razon_social || '',
        ruc: clienteToEdit.ruc || '',
        contacto_principal: clienteToEdit.contacto_principal || '',
        telefono: clienteToEdit.telefono || '',
        email: clienteToEdit.email || '',
        direccion: clienteToEdit.direccion || '',
        estado: clienteToEdit.estado || 'ACTIVO',
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
    setSubmitted(false);
  }, [clienteToEdit, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al modificarlo
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.razon_social.trim()) {
      newErrors.razon_social = 'La razón social es obligatoria.';
    }

    if (!formData.ruc.trim()) {
      newErrors.ruc = 'El RUC es obligatorio.';
    } else if (!/^\d{11}$/.test(formData.ruc)) {
      newErrors.ruc = 'El RUC debe tener exactamente 11 dígitos.';
    }

    if (!formData.contacto_principal.trim()) {
      newErrors.contacto_principal = 'El contacto principal es obligatorio.';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData);
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      id="cliente-modal"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content eco-modal">
          {/* Header */}
          <div className="modal-header eco-modal-header">
            <div className="modal-header-icon">
              <i className={`bi ${isEditMode ? 'bi-pencil-square' : 'bi-person-plus-fill'}`}></i>
            </div>
            <h5 className="modal-title">
              {isEditMode ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body eco-modal-body">
              <div className="row g-3">
                {/* Razón Social */}
                <div className="col-12">
                  <label className="form-label eco-label">
                    Razón Social <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control eco-input ${submitted && errors.razon_social ? 'is-invalid' : ''
                      }`}
                    name="razon_social"
                    value={formData.razon_social}
                    onChange={handleChange}
                    placeholder="Ej: Empresa ABC S.A.C."
                    id="input-razon-social"
                  />
                  {errors.razon_social && (
                    <div className="invalid-feedback">{errors.razon_social}</div>
                  )}
                </div>

                {/* RUC y Contacto */}
                <div className="col-md-6">
                  <label className="form-label eco-label">
                    RUC <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control eco-input ${submitted && errors.ruc ? 'is-invalid' : ''
                      }`}
                    name="ruc"
                    value={formData.ruc}
                    onChange={handleChange}
                    placeholder="11 dígitos"
                    maxLength={11}
                    id="input-ruc"
                  />
                  {errors.ruc && (
                    <div className="invalid-feedback">{errors.ruc}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">
                    Contacto Principal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control eco-input ${submitted && errors.contacto_principal ? 'is-invalid' : ''
                      }`}
                    name="contacto_principal"
                    value={formData.contacto_principal}
                    onChange={handleChange}
                    placeholder="Nombre del contacto"
                    id="input-contacto"
                  />
                  {errors.contacto_principal && (
                    <div className="invalid-feedback">{errors.contacto_principal}</div>
                  )}
                </div>

                {/* Teléfono y Email */}
                <div className="col-md-6">
                  <label className="form-label eco-label">
                    Teléfono <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control eco-input ${submitted && errors.telefono ? 'is-invalid' : ''
                      }`}
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 01-4567890"
                    id="input-telefono"
                  />
                  {errors.telefono && (
                    <div className="invalid-feedback">{errors.telefono}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control eco-input ${submitted && errors.email ? 'is-invalid' : ''
                      }`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@empresa.com"
                    id="input-email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Dirección */}
                <div className="col-12">
                  <label className="form-label eco-label">Dirección</label>
                  <textarea
                    className="form-control eco-input"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Dirección completa (opcional)"
                    id="input-direccion"
                  ></textarea>
                </div>

                {/* Estado */}
                <div className="col-md-6">
                  <label className="form-label eco-label">Estado</label>
                  <select
                    className="form-select eco-input"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    id="select-estado"
                  >
                    <option value="ACTIVO">Activo</option>
                    <option value="INACTIVO">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer eco-modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary eco-btn-cancel"
                onClick={onClose}
              >
                <i className="bi bi-x-lg me-1"></i>
                Cancelar
              </button>
              <button
                type="submit"
                className="btn eco-btn-save"
                id="btn-save-cliente"
              >
                <i className={`bi ${isEditMode ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>
                {isEditMode ? 'Guardar Cambios' : 'Registrar Cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClienteModal;
