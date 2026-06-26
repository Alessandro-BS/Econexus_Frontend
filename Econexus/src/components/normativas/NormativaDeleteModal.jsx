function NormativaDeleteModal({ show, normativa, onClose, onConfirm }) {
  if (!show || !normativa) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Confirmar Eliminación
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Cerrar"></button>
          </div>
          <div className="modal-body p-4 text-center">
            <i className="bi bi-trash text-danger" style={{ fontSize: '3rem' }}></i>
            <h4 className="mt-3 mb-2">¿Estás seguro?</h4>
            <p className="text-muted mb-0">
              Estás a punto de eliminar la normativa:<br/>
              <strong>{normativa.codigo}</strong>
            </p>
            <p className="text-danger small mt-2">
              Esta acción cambiará el estado a INACTIVO/DEROGADO.
            </p>
          </div>
          <div className="modal-footer bg-light border-0 justify-content-center">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger px-4" onClick={() => onConfirm(normativa.id)}>
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NormativaDeleteModal;
