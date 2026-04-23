import { useState, useEffect } from 'react';

const emptyForm = {
  razonSocial: '',
  ruc: '',
  contactoPrincipal: '',
  telefono: '',
  email: '',
  direccion: '',
  tipoServicio: 'SOLIDO_PELIGROSO',
  estado: 'ACTIVO',
};

const tiposServicio = [
  { value: 'SOLIDO_PELIGROSO', label: 'Sólido Peligroso' },
  { value: 'SOLIDO_NO_PELIGROSO', label: 'Sólido No Peligroso' },
  { value: 'LIQUIDO', label: 'Líquido' },
  { value: 'FUMIGACION', label: 'Fumigación' },
  { value: 'DESINFECCION', label: 'Desinfección' },
  { value: 'DESINSECTACION', label: 'Desinsectación' },
];

/**
 * Modal para crear y editar proveedores.
 * @param {boolean} show - Visibilidad del modal
 * @param {function} onClose - Cierra el modal
 * @param {function} onSave - Guarda el proveedor (nuevo o editado)
 * @param {object|null} proveedorToEdit - Si no es null, modo edición
 */
function ProveedorModal({ show, onClose, onSave, proveedorToEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isEditMode = !!proveedorToEdit;

  // Cargar datos al abrir en modo edición
  useEffect(() => {
    if (proveedorToEdit) {
      setFormData({
        razonSocial: proveedorToEdit.razonSocial || '',
        ruc: proveedorToEdit.ruc || '',
        contactoPrincipal: proveedorToEdit.contactoPrincipal || '',
        telefono: proveedorToEdit.telefono || '',
        email: proveedorToEdit.email || '',
        direccion: proveedorToEdit.direccion || '',
        tipoServicio: proveedorToEdit.tipoServicio || 'SOLIDO_PELIGROSO',
        estado: proveedorToEdit.estado || 'ACTIVO',
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
    setSubmitted(false);
  }, [proveedorToEdit, show]);

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

    if (!formData.razonSocial.trim()) {
      newErrors.razonSocial = 'La razón social es obligatoria.';
    } else if (formData.razonSocial.trim().length < 3) {
      newErrors.razonSocial = 'La razón social debe tener al menos 3 caracteres.';
    }

    if (!formData.ruc.trim()) {
      newErrors.ruc = 'El RUC es obligatorio.';
    } else if (!/^\d{11}$/.test(formData.ruc)) {
      newErrors.ruc = 'El RUC debe tener exactamente 11 dígitos.';
    }

    if (!formData.contactoPrincipal.trim()) {
      newErrors.contactoPrincipal = 'El contacto principal es obligatorio.';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido.';
    }

    if (!formData.tipoServicio) {
      newErrors.tipoServicio = 'Selecciona un tipo de servicio.';
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
      id="proveedor-modal"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content eco-modal">
          {/* Header */}
          <div className="modal-header eco-modal-header">
            <div className="modal-header-icon">
              <i className={`bi ${isEditMode ? 'bi-pencil-square' : 'bi-truck-front-fill'}`}></i>
            </div>
            <h5 className="modal-title">
              {isEditMode ? 'Editar Proveedor' : 'Nuevo Proveedor'}
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
                    className={`form-control eco-input ${submitted && errors.razonSocial ? 'is-invalid' : ''}`}
                    name="razonSocial"
                    value={formData.razonSocial}
                    onChange={handleChange}
                    placeholder="Ej: Quimitek Perú S.A.C."
                    id="input-razon-social-prov"
                  />
                  {errors.razonSocial && (
                    <div className="invalid-feedback">{errors.razonSocial}</div>
                  )}
                </div>

                {/* RUC y Contacto */}
                <div className="col-md-6">
                  <label className="form-label eco-label">
                    RUC <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control eco-input ${submitted && errors.ruc ? 'is-invalid' : ''}`}
                    name="ruc"
                    value={formData.ruc}
                    onChange={handleChange}
                    placeholder="11 dígitos"
                    maxLength={11}
                    id="input-ruc-prov"
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
                    className={`form-control eco-input ${submitted && errors.contactoPrincipal ? 'is-invalid' : ''}`}
                    name="contactoPrincipal"
                    value={formData.contactoPrincipal}
                    onChange={handleChange}
                    placeholder="Nombre del contacto"
                    id="input-contacto-prov"
                  />
                  {errors.contactoPrincipal && (
                    <div className="invalid-feedback">{errors.contactoPrincipal}</div>
                  )}
                </div>

                {/* Teléfono y Email */}
                <div className="col-md-6">
                  <label className="form-label eco-label">
                    Teléfono <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control eco-input ${submitted && errors.telefono ? 'is-invalid' : ''}`}
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 01-1234567"
                    id="input-telefono-prov"
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
                    className={`form-control eco-input ${submitted && errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    id="input-email-prov"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Dirección */}
                <div className="col-12">
                  <label className="form-label eco-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control eco-input"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Dirección completa (opcional)"
                    id="input-direccion-prov"
                  />
                </div>

                {/* Tipo de Servicio */}
                <div className="col-md-6">
                  <label className="form-label eco-label">
                    Tipo de Servicio <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control eco-input ${submitted && errors.tipoServicio ? 'is-invalid' : ''}`}
                    name="tipoServicio"
                    value={formData.tipoServicio}
                    onChange={handleChange}
                    id="input-tipo-servicio"
                  >
                    <option value="">Selecciona un tipo...</option>
                    {tiposServicio.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                  {errors.tipoServicio && (
                    <div className="invalid-feedback">{errors.tipoServicio}</div>
                  )}
                </div>

                {/* Estado */}
                <div className="col-md-6">
                  <label className="form-label eco-label">Estado</label>
                  <select
                    className="form-control eco-input"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    id="input-estado-prov"
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
                className="btn eco-btn-primary"
                id="btn-save-proveedor"
              >
                <i className="bi bi-check-lg me-1"></i>
                {isEditMode ? 'Actualizar' : 'Crear'} Proveedor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProveedorModal;
