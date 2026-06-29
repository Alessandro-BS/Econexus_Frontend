import { useState, useEffect } from 'react';
import useApiCrud from '../../hooks/useApiCrud';

const emptyForm = {
  razon_social: '',
  ruc: '',
  contacto_principal: '',
  telefono: '',
  email: '',
  direccion: '',
  tipo_servicio_id: '',
  estado: 'ACTIVO',
};

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
  const { data: tiposServicio, loading: loadingTipos } = useApiCrud('/tipos-servicio');

  const isEditMode = !!proveedorToEdit;

  // Cargar datos al abrir en modo edición
  useEffect(() => {
    if (proveedorToEdit) {
      setFormData({
        razon_social: proveedorToEdit.razon_social || '',
        ruc: proveedorToEdit.ruc || '',
        contacto_principal: proveedorToEdit.contacto_principal || '',
        telefono: proveedorToEdit.telefono || '',
        email: proveedorToEdit.email || '',
        direccion: proveedorToEdit.direccion || '',
        tipo_servicio_id: proveedorToEdit.tipo_servicio_id || '',
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
    
    let finalValue = value;
    if (name === 'contacto_principal') {
      // Elimina cualquier carácter que no sea letra o espacio
      finalValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    if (name === 'ruc' || name === 'telefono') {
      // Elimina cualquier carácter que no sea número
      finalValue = value.replace(/[^0-9]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
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
    } else if (formData.razon_social.trim().length < 3) {
      newErrors.razon_social = 'La razón social debe tener al menos 3 caracteres.';
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

    if (!formData.tipo_servicio_id) {
      newErrors.tipo_servicio_id = 'Selecciona el tipo de servicio.';
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
                    className={`form-control eco-input ${submitted && errors.razon_social ? 'is-invalid' : ''}`}
                    name="razon_social"
                    value={formData.razon_social}
                    onChange={handleChange}
                    placeholder="Ej: Quimitek Perú S.A.C."
                    id="input-razon-social-prov"
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
                    className={`form-control eco-input ${submitted && errors.contacto_principal ? 'is-invalid' : ''}`}
                    name="contacto_principal"
                    value={formData.contacto_principal}
                    onChange={handleChange}
                    placeholder="Nombre del contacto"
                    id="input-contacto-prov"
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
                  <textarea
                    className="form-control eco-input"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    rows={3}
                    maxLength={100}
                    placeholder="Dirección completa (opcional, máx. 100 caracteres)"
                    id="input-direccion-prov"
                  ></textarea>
                </div>

                {/* Tipo de Servicio */}
                <div className="col-md-6">
                  <label className="form-label eco-label">
                    Tipo de Servicio <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select eco-input ${submitted && errors.tipo_servicio_id ? 'is-invalid' : ''}`}
                    name="tipo_servicio_id"
                    value={formData.tipo_servicio_id}
                    onChange={handleChange}
                    id="input-tipo-servicio"
                    disabled={loadingTipos}
                  >
                    <option value="">Seleccione un servicio</option>
                    {tiposServicio && tiposServicio.map(tipo => (
                      <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                    ))}
                  </select>
                  {errors.tipo_servicio_id && (
                    <div className="invalid-feedback">{errors.tipo_servicio_id}</div>
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
