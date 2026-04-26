/**
 * Modal de confirmación para desactivar un proveedor.
 */
function ProveedorDeleteModal({ show, proveedor, onClose, onConfirm }) {
  if (!show || !proveedor) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      id="proveedor-delete-modal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content eco-modal">
          {/* Header */}
          <div className="modal-header eco-modal-header eco-modal-header-danger">
            <div className="modal-header-icon danger">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <h5 className="modal-title">Desactivar Proveedor</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body eco-modal-body text-center py-4">
            <div className="delete-warning-icon">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <p className="delete-message mt-3">
              ¿Deseas desactivar este proveedor?
            </p>
            <p className="delete-client-name">
              <strong>{proveedor.razonSocial}</strong>
            </p>
            <p className="delete-sub-message">
              <small className="text-muted">
                RUC: {proveedor.ruc} — Podrás reactivarlo posteriormente.
              </small>
            </p>
          </div>

          {/* Footer */}
          <div className="modal-footer eco-modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-outline-secondary eco-btn-cancel"
              onClick={onClose}
            >
              <i className="bi bi-x-lg me-1"></i>
              Cancelar
            </button>
            <button
              type="button"
              className="btn eco-btn-delete"
              onClick={() => onConfirm(proveedor.id)}
              id="btn-confirm-deactivate"
            >
              <i className="bi bi-check-lg me-1"></i>
              Sí, Desactivar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProveedorDeleteModal;
