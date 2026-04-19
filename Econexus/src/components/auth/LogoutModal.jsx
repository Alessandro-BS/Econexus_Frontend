/**
 * Modal de confirmación para cerrar sesión.
 * Reutiliza los estilos eco-modal de ClientesPage.css
 */
function LogoutModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      id="logout-modal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content eco-modal">
          {/* Header */}
          <div className="modal-header eco-modal-header">
            <div className="modal-header-icon">
              <i className="bi bi-box-arrow-left"></i>
            </div>
            <h5 className="modal-title">Cerrar Sesión</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body eco-modal-body text-center py-4">
            <div className="logout-warning-icon">
              <i className="bi bi-door-open-fill"></i>
            </div>
            <p className="delete-message mt-3">
              ¿Está seguro que desea cerrar sesión?
            </p>
            <p className="mb-0">
              <small className="text-muted">
                Será redirigido a la página de inicio de sesión.
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
              className="btn eco-btn-save"
              onClick={onConfirm}
              id="btn-confirm-logout"
            >
              <i className="bi bi-box-arrow-left me-1"></i>
              Sí, Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
