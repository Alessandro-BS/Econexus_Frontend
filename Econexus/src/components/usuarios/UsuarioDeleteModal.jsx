/**
 * Modal de confirmación para eliminar un usuario.
 * @param {boolean} show - Visibilidad del modal
 * @param {function} onClose - Cierra el modal
 * @param {function} onConfirm - Confirma la eliminación
 * @param {object|null} usuarioToDelete - Usuario a eliminar
 */
function UsuarioDeleteModal({ show, onClose, onConfirm, usuarioToDelete }) {
  const handleConfirm = () => {
    if (usuarioToDelete) {
      onConfirm(usuarioToDelete.id);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content usuario-delete-modal">
            <div className="modal-header delete-modal-header">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle-fill me-2 text-danger"></i>
                Confirmar Eliminación
              </h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
            </div>
            <div className="modal-body delete-modal-body">
              {usuarioToDelete && (
                <>
                  <p className="delete-confirmation-text">
                    ¿Estás seguro de que deseas eliminar al usuario:
                  </p>
                  <div className="delete-item-info">
                    <div className="delete-item-detail">
                      <span className="delete-item-label">Nombre:</span>
                      <span className="delete-item-value">
                        {usuarioToDelete.nombre_completo}
                      </span>
                    </div>
                    <div className="delete-item-detail">
                      <span className="delete-item-label">Email:</span>
                      <span className="delete-item-value">{usuarioToDelete.email}</span>
                    </div>
                    <div className="delete-item-detail">
                      <span className="delete-item-label">Rol:</span>
                      <span className={`badge ${usuarioToDelete.rol === 'ADMIN' ? 'bg-primary' : usuarioToDelete.rol === 'SUPERVISOR' ? 'bg-info' : 'bg-warning'}`}>
                        {usuarioToDelete.rol}
                      </span>
                    </div>
                  </div>
                  <p className="delete-warning-text">
                    <i className="bi bi-info-circle me-2"></i>
                    Esta acción <strong>no se puede deshacer</strong>. El usuario será eliminado permanentemente del sistema.
                  </p>
                </>
              )}
            </div>
            <div className="modal-footer delete-modal-footer">
              <button type="button" className="btn btn-outline-secondary btn-modal-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger btn-modal-delete" onClick={handleConfirm}>
                <i className="bi bi-trash-fill me-2"></i>
                Eliminar Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default UsuarioDeleteModal;
