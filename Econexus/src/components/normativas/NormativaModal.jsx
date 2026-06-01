import { useState, useEffect } from 'react';

const emptyForm = {
  codigo: '',
  titulo: '',
  descripcion: '',
  fecha_publicacion: '',
  entidad_emisora: '',
  url_documento: '',
  estado: 'VIGENTE',
};

function NormativaModal({ show, onClose, onSave, normativaToEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isEditMode = !!normativaToEdit;

  useEffect(() => {
    if (normativaToEdit) {
      setFormData({
        codigo: normativaToEdit.codigo || '',
        titulo: normativaToEdit.titulo || '',
        descripcion: normativaToEdit.descripcion || '',
        fecha_publicacion: normativaToEdit.fecha_publicacion || '',
        entidad_emisora: normativaToEdit.entidad_emisora || '',
        url_documento: normativaToEdit.url_documento || '',
        estado: normativaToEdit.estado || 'VIGENTE',
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
    setSubmitted(false);
  }, [normativaToEdit, show]);

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
    if (!formData.codigo.trim()) newErrors.codigo = 'El código es obligatorio.';
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es obligatorio.';
    if (!formData.fecha_publicacion.trim()) newErrors.fecha_publicacion = 'La fecha de publicación es obligatoria.';
    if (!formData.entidad_emisora.trim()) newErrors.entidad_emisora = 'La entidad emisora es obligatoria.';
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
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content eco-modal">
          <div className="modal-header eco-modal-header">
            <div className="modal-header-icon">
              <i className={`bi ${isEditMode ? 'bi-pencil-square' : 'bi-journal-plus'}`}></i>
            </div>
            <h5 className="modal-title">
              {isEditMode ? 'Editar Normativa' : 'Nueva Normativa'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Cerrar"></button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body eco-modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label eco-label">Código <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control eco-input ${submitted && errors.codigo ? 'is-invalid' : ''}`}
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    placeholder="Ej: D.S. N° 001-2026-MINAM"
                  />
                  {errors.codigo && <div className="invalid-feedback">{errors.codigo}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Fecha Publicación <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    className={`form-control eco-input ${submitted && errors.fecha_publicacion ? 'is-invalid' : ''}`}
                    name="fecha_publicacion"
                    value={formData.fecha_publicacion}
                    onChange={handleChange}
                  />
                  {errors.fecha_publicacion && <div className="invalid-feedback">{errors.fecha_publicacion}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label eco-label">Título <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control eco-input ${submitted && errors.titulo ? 'is-invalid' : ''}`}
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Título de la normativa"
                  />
                  {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label eco-label">Descripción</label>
                  <textarea
                    className="form-control eco-input"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Breve descripción..."
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Entidad Emisora <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control eco-input ${submitted && errors.entidad_emisora ? 'is-invalid' : ''}`}
                    name="entidad_emisora"
                    value={formData.entidad_emisora}
                    onChange={handleChange}
                    placeholder="Ej: MINSA, MINAM, OEFA"
                  />
                  {errors.entidad_emisora && <div className="invalid-feedback">{errors.entidad_emisora}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Enlace Web (URL)</label>
                  <input
                    type="url"
                    className="form-control eco-input"
                    name="url_documento"
                    value={formData.url_documento}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label eco-label">Estado</label>
                  <select
                    className="form-select eco-input"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                  >
                    <option value="VIGENTE">Vigente</option>
                    <option value="DEROGADA">Derogada</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer eco-modal-footer">
              <button type="button" className="btn btn-outline-secondary eco-btn-cancel" onClick={onClose}>
                <i className="bi bi-x-lg me-1"></i> Cancelar
              </button>
              <button type="submit" className="btn eco-btn-save">
                <i className={`bi ${isEditMode ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>
                {isEditMode ? 'Guardar Cambios' : 'Registrar Normativa'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NormativaModal;
