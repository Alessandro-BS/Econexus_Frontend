import { useState, useEffect } from 'react';

/**
 * Modal para Crear nueva Orden de Servicio
 */
function VentaModal({ show, onClose, onSave, clientes }) {
  const [formData, setFormData] = useState({
    fecha_emision: new Date().toISOString().split('T')[0],
    cliente_id: '',
    monto_total: '',
    estado_pago: 'PENDIENTE',
    pdf_base64: null,
  });

  const [pdfName, setPdfName] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (show) {
      setFormData({
        fecha_emision: new Date().toISOString().split('T')[0],
        cliente_id: '',
        monto_total: '',
        estado_pago: 'PENDIENTE',
        pdf_base64: null,
      });
      setPdfName('');
    }
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, pdf_base64: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona un archivo PDF válido.");
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cliente_id || !formData.monto_total) return;

    // Get client name for the record
    const client = clientes.find(c => c.id === Number(formData.cliente_id));
    const dataToSave = {
      ...formData,
      cliente_id: Number(formData.cliente_id),
      cliente_nombre: client ? client.razon_social : 'Desconocido',
      monto_total: parseFloat(formData.monto_total),
    };

    onSave(dataToSave);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content animate-fade-in-up eco-modal" style={{ animationDuration: '0.3s' }}>
          <div className="modal-header eco-modal-header">
            <h5 className="modal-title text-white">
              <i className="bi bi-file-earmark-plus-fill me-2"></i>
              Generar Orden de Servicio
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body eco-modal-body">
              <div className="row g-3">

                {/* Fecha Emisión */}
                <div className="col-md-6">
                  <label className="eco-label">Fecha de Emisión <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    className="form-control eco-input"
                    name="fecha_emision"
                    value={formData.fecha_emision}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Cliente */}
                <div className="col-md-6">
                  <label className="eco-label">Cliente <span className="text-danger">*</span></label>
                  <select
                    className="form-select eco-input"
                    name="cliente_id"
                    value={formData.cliente_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un cliente...</option>
                    {clientes.map(c => (
                      <option key={c.id} value={c.id}>{c.razon_social}</option>
                    ))}
                  </select>
                </div>

                {/* Monto Total */}
                <div className="col-md-6">
                  <label className="eco-label">Monto Total (S/.) <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <span className="input-group-text eco-input border-end-0 bg-light">S/.</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-control eco-input border-start-0"
                      name="monto_total"
                      value={formData.monto_total}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                {/* Estado Pago */}
                <div className="col-md-6">
                  <label className="eco-label">Estado de Pago <span className="text-danger">*</span></label>
                  <select
                    className="form-select eco-input"
                    name="estado_pago"
                    value={formData.estado_pago}
                    onChange={handleChange}
                    required
                  >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="PAGADO">PAGADO</option>
                    <option value="ANULADO">ANULADO</option>
                  </select>
                </div>

                {/* Adjuntar PDF */}
                <div className="col-12">
                  <label className="eco-label">Adjuntar PDF de Orden</label>
                  <input
                    type="file"
                    className="form-control eco-input"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  {pdfName && <small className="text-success mt-1 d-block"><i className="bi bi-check-circle me-1"></i> Archivo seleccionado: {pdfName}</small>}
                </div>

              </div>
            </div>
            <div className="modal-footer eco-modal-footer">
              <button type="button" className="btn btn-outline-secondary eco-btn-cancel px-4" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn eco-btn-save px-4">
                <i className="bi bi-save me-2"></i>
                Generar OS
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VentaModal;
