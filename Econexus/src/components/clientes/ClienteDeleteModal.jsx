/**
 * Modal de confirmación para eliminar un cliente.
 */
function ClienteDeleteModal({ show, cliente, onClose, onConfirm }) {
  if (!show || !cliente) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      id="delete-modal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content eco-modal">
          {/* Header */}
          <div className="modal-header eco-modal-header eco-modal-header-danger">
            <div className="modal-header-icon danger">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <h5 className="modal-title">Confirmar Eliminación</h5>
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
              <i className="bi bi-trash3-fill"></i>
            </div>
            <p className="delete-message mt-3">
              ¿Estás seguro que deseas eliminar al cliente:
            </p>
            <p className="delete-client-name">
              <strong>{cliente.razon_social}</strong>
            </p>
            <p className="delete-sub-message">
              <small className="text-muted">
                RUC: {cliente.ruc} — Esta acción no se puede deshacer.
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
              onClick={() => onConfirm(cliente.id)}
              id="btn-confirm-delete"
            >
              <i className="bi bi-trash3-fill me-1"></i>
              Sí, Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClienteDeleteModal;
