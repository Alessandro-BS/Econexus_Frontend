import { useState, useEffect } from 'react';

/**
 * Modal para Editar o Ver una Orden de Servicio
 */
function VentaEditModal({ show, isViewOnly, venta, onClose, onSave }) {
  const [estadoPago, setEstadoPago] = useState('PENDIENTE');

  useEffect(() => {
    if (show && venta) {
      setEstadoPago(venta.estado_pago);
    }
  }, [show, venta]);

  if (!show || !venta) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewOnly) {
      onClose();
    } else {
      onSave({ estado_pago: estadoPago });
    }
  };

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content animate-fade-in-up eco-modal" style={{ animationDuration: '0.3s' }}>
          <div className="modal-header eco-modal-header">
            <h5 className="modal-title text-white">
              <i className={`bi ${isViewOnly ? 'bi-eye-fill' : 'bi-pencil-square'} me-2`}></i>
              {isViewOnly ? 'Detalles de Orden' : 'Editar Estado de Orden'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body eco-modal-body">
              <div className="mb-3">
                <label className="eco-label mb-1">N° Orden</label>
                <div className="fw-bold fs-5 text-primary">{venta.numero_orden}</div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label className="eco-label mb-1">Fecha Emisión</label>
                  <div>{venta.fecha_emision}</div>
                </div>
                <div className="col-6">
                  <label className="eco-label mb-1">Monto Total</label>
                  <div className="fw-bold">{formatCurrency(venta.monto_total)}</div>
                </div>
              </div>
              <div className="mb-3">
                <label className="eco-label mb-1">Cliente</label>
                <div>{venta.cliente_nombre}</div>
              </div>
              
              {/* Campo editable (Estado) */}
              <div className="mb-3">
                <label className="eco-label">Estado de Pago</label>
                {isViewOnly ? (
                  <div>
                    <span className={`eco-badge-${venta.estado_pago.toLowerCase()}`}>
                      {venta.estado_pago}
                    </span>
                  </div>
                ) : (
                  <select
                    className="form-select eco-input"
                    value={estadoPago}
                    onChange={(e) => setEstadoPago(e.target.value)}
                  >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="PAGADO">PAGADO</option>
                    <option value="ANULADO">ANULADO</option>
                  </select>
                )}
              </div>
            </div>
            <div className="modal-footer eco-modal-footer">
              {isViewOnly ? (
                <button type="button" className="btn btn-secondary eco-btn-cancel px-4" onClick={onClose}>
                  Cerrar
                </button>
              ) : (
                <>
                  <button type="button" className="btn btn-outline-secondary eco-btn-cancel px-4" onClick={onClose}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn eco-btn-save px-4">
                    <i className="bi bi-save me-2"></i>
                    Guardar Cambios
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VentaEditModal;
