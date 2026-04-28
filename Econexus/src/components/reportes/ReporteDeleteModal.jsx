import './ReportesPage.css';

function ReporteDeleteModal({ show, reporte, onClose, onConfirm }) {
  if (!show || !reporte) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content eco-modal">
          <div className="modal-header eco-modal-header eco-modal-header-danger">
            <div className="modal-header-icon danger">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <h5 className="modal-title">Eliminar Reporte</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>
          
          <div className="modal-body eco-modal-body text-center">
            <div className="delete-warning-icon mb-3">
              <i className="bi bi-trash"></i>
            </div>
            <p className="delete-message">¿Estás seguro de que deseas eliminar este reporte?</p>
            <p className="delete-client-name fw-bold">{reporte.cliente_nombre}</p>
            <p className="text-muted small delete-sub-message mb-3">Servicio: {reporte.tipo_servicio}</p>
            <p className="text-danger small">Esta acción no se puede deshacer.</p>
          </div>

          <div className="modal-footer eco-modal-footer justify-content-center">
            <button className="btn btn-outline-secondary eco-btn-cancel" onClick={onClose}>
              <i className="bi bi-x-lg me-1"></i> Cancelar
            </button>
            <button 
              className="btn eco-btn-delete" 
              onClick={() => onConfirm(reporte.id)}
            >
              <i className="bi bi-trash-fill me-2"></i>Eliminar Reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReporteDeleteModal;
