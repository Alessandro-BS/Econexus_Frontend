/**
 * Modal para visualizar el PDF adjunto
 */
function VentaPdfModal({ show, venta, onClose }) {
  if (!show || !venta) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content animate-fade-in-up eco-modal" style={{ animationDuration: '0.3s' }}>
          <div className="modal-header eco-modal-header eco-modal-header-danger">
            <h5 className="modal-title text-white">
              <i className="bi bi-file-pdf-fill me-2"></i>
              PDF Adjunto: {venta.numero_orden}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body p-0">
            {venta.pdf_base64 ? (
              <div className="pdf-viewer-container">
                <iframe 
                  src={venta.pdf_base64} 
                  title={`PDF ${venta.numero_orden}`}
                  width="100%"
                  height="100%"
                />
              </div>
            ) : (
              <div className="pdf-viewer-container bg-light">
                <div className="pdf-no-data text-muted">
                  <i className="bi bi-file-earmark-x display-1 mb-3"></i>
                  <h4>No hay PDF adjunto</h4>
                  <p>Esta orden fue generada sin un archivo PDF.</p>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer eco-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VentaPdfModal;
