import { useState, useEffect, useMemo } from 'react';

/**
 * Modal para Crear nueva Orden de Servicio
 */
function VentaModal({ show, onClose, onSave, clientes }) {
  const [formData, setFormData] = useState({
    fecha_emision: new Date().toISOString().split('T')[0],
    cliente_nombre: '',
    monto_total: '',
    estado_pago: 'PENDIENTE',
    pdf_base64: null,
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [pdfName, setPdfName] = useState('');

  const filteredClientes = useMemo(() => {
    const term = formData.cliente_nombre.trim().toLowerCase();
    if (!term) return clientes.slice(0, 8);
    return clientes
      .filter((c) => c.razon_social.toLowerCase().includes(term))
      .slice(0, 8);
  }, [clientes, formData.cliente_nombre]);

  // Reset form when modal opens
  useEffect(() => {
    if (show) {
      setFormData({
        fecha_emision: new Date().toISOString().split('T')[0],
        cliente_nombre: '',
        monto_total: '',
        estado_pago: 'PENDIENTE',
        pdf_base64: null,
      });
      setPdfName('');
      setShowSuggestions(false);
    }
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'cliente_nombre') {
      setShowSuggestions(true);
    }
  };

  const handleClientSelect = (cliente) => {
    setFormData((prev) => ({
      ...prev,
      cliente_nombre: cliente.razon_social,
    }));
    setShowSuggestions(false);
  };

  const handleClientFocus = () => {
    setShowSuggestions(true);
  };

  const handleClientBlur = () => {
    window.setTimeout(() => setShowSuggestions(false), 150);
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
    if (!formData.cliente_nombre.trim() || !formData.monto_total) return;

    const selectedClient = clientes.find(
      (c) => c.razon_social.toLowerCase() === formData.cliente_nombre.trim().toLowerCase()
    );

    if (!selectedClient) {
      alert('Selecciona un cliente válido desde la lista de sugerencias.');
      return;
    }

    const dataToSave = {
      ...formData,
      cliente_id: selectedClient.id,
      cliente_nombre: selectedClient.razon_social,
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
                <div className="col-md-6 position-relative">
                  <label className="eco-label">Cliente <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control eco-input"
                    name="cliente_nombre"
                    value={formData.cliente_nombre}
                    onChange={handleChange}
                    onFocus={handleClientFocus}
                    onBlur={handleClientBlur}
                    placeholder="Escribe el nombre del cliente..."
                    required
                    autoComplete="off"
                  />
                  {showSuggestions && (
                    <ul
                      className="list-group position-absolute w-100 shadow-sm"
                      style={{
                        zIndex: 1100,
                        maxHeight: '260px',
                        overflowY: 'auto',
                        background: '#fff',
                        borderRadius: '0 0 .35rem .35rem',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        marginTop: '0.12rem',
                      }}
                    >
                      {filteredClientes.length > 0 ? (
                        filteredClientes.map((c) => (
                          <li
                            key={c.id}
                            className="list-group-item list-group-item-action"
                            style={{ cursor: 'pointer' }}
                            onMouseDown={() => handleClientSelect(c)}
                          >
                            {c.razon_social}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">No se encontró cliente.</li>
                      )}
                    </ul>
                  )}
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
