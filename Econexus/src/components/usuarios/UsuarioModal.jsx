import { useState, useEffect } from 'react';

const emptyForm = {
  nombre_completo: '',
  email: '',
  telefono: '',
  rol: 'OPERADOR',
  estado: 'ACTIVO',
  fecha_creacion: new Date().toISOString().split('T')[0],
  password: '123456',
};

/**
 * Modal para crear y editar usuarios.
 * @param {boolean} show - Visibilidad del modal
 * @param {function} onClose - Cierra el modal
 * @param {function} onSave - Guarda el usuario (nuevo o editado)
 * @param {object|null} usuarioToEdit - Si no es null, modo edición
 */
function UsuarioModal({ show, onClose, onSave, usuarioToEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isEditMode = !!usuarioToEdit;

  useEffect(() => {
    if (usuarioToEdit) {
      setFormData({
        nombre_completo: usuarioToEdit.nombre_completo || '',
        email: usuarioToEdit.email || '',
        telefono: usuarioToEdit.telefono || '',
        rol: usuarioToEdit.rol || 'OPERADOR',
        estado: usuarioToEdit.estado || 'ACTIVO',
        fecha_creacion: usuarioToEdit.fecha_creacion || new Date().toISOString().split('T')[0],
        password: usuarioToEdit.password || '123456',
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
    setSubmitted(false);
  }, [usuarioToEdit, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (!formData.rol) {
      newErrors.rol = 'El rol es requerido';
    }

    if (!isEditMode && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSubmitted(true);

    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
    } else {
      setErrors(newErrors);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content usuario-modal">
            <div className="modal-header usuario-modal-header">
              <h5 className="modal-title">
                <i className={`bi ${isEditMode ? 'bi-pencil-fill' : 'bi-plus-circle-fill'} me-2`}></i>
                {isEditMode ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={onClose}></button>
            </div>
            <div className="modal-body usuario-modal-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-custom">
                      Nombre Completo
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre_completo"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      placeholder="Ej: Juan Pérez García"
                      className={`form-control form-control-custom ${submitted && errors.nombre_completo ? 'is-invalid' : ''}`}
                    />
                    {submitted && errors.nombre_completo && (
                      <div className="invalid-feedback">{errors.nombre_completo}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label-custom">
                      Email
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="usuario@econexus.com.pe"
                      className={`form-control form-control-custom ${submitted && errors.email ? 'is-invalid' : ''}`}
                    />
                    {submitted && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label-custom">
                      Teléfono
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Ej: 01-1234567"
                      className={`form-control form-control-custom ${submitted && errors.telefono ? 'is-invalid' : ''}`}
                    />
                    {submitted && errors.telefono && (
                      <div className="invalid-feedback">{errors.telefono}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label-custom">
                      Rol
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <select
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                      className={`form-select form-control-custom ${submitted && errors.rol ? 'is-invalid' : ''}`}
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="SUPERVISOR">Supervisor</option>
                      <option value="OPERADOR">Operador</option>
                    </select>
                    {submitted && errors.rol && (
                      <div className="invalid-feedback">{errors.rol}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label-custom">Estado</label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      className="form-select form-control-custom"
                    >
                      <option value="ACTIVO">Activo</option>
                      <option value="INACTIVO">Inactivo</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label-custom">Fecha Creación</label>
                    <input
                      type="date"
                      name="fecha_creacion"
                      value={formData.fecha_creacion}
                      onChange={handleChange}
                      className="form-control form-control-custom"
                      disabled={isEditMode}
                    />
                  </div>

                  {!isEditMode && (
                    <div className="col-md-12 mb-3">
                      <label className="form-label-custom">
                        Contraseña
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Contraseña temporal (mín. 6 caracteres)"
                        className={`form-control form-control-custom ${submitted && errors.password ? 'is-invalid' : ''}`}
                      />
                      {submitted && errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                      <div className="form-text text-muted">
                        Contraseña temporal que el usuario deberá cambiar en el primer login
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer usuario-modal-footer">
              <button type="button" className="btn btn-outline-secondary btn-modal-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="button" className="btn btn-success btn-modal-save" onClick={handleSubmit}>
                <i className={`bi ${isEditMode ? 'bi-check-circle-fill' : 'bi-plus-circle-fill'} me-2`}></i>
                {isEditMode ? 'Guardar Cambios' : 'Crear Usuario'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default UsuarioModal;
