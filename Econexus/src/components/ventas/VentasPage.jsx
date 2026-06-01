import { useState, useCallback } from 'react';
import useApiCrud from '../../hooks/useApiCrud';
import VentaKPIs from './VentaKPIs';
import VentaTable from './VentaTable';
import VentaModal from './VentaModal';
import VentaEditModal from './VentaEditModal';
import VentaPdfModal from './VentaPdfModal';
import './VentasPage.css';

/**
 * Página principal de Gestión de Ventas (Órdenes de Servicio)
 */
function VentasPage() {
  const { data: ventas, loading, error, create, update } = useApiCrud('/ordenes');
  const { data: clientes } = useApiCrud('/clientes');

  // Estados de modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Elemento seleccionado
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  // Abrir modal de creación
  const handleOpenCreate = () => {
    setShowCreateModal(true);
  };

  // Guardar nueva orden
  const handleSaveCreate = async (formData) => {
    try {
      // El backend debería generar el ID y el código OS automáticamente
      await create(formData);
      setShowCreateModal(false);
    } catch (err) {
      alert('Error al crear la orden de servicio');
    }
  };

  // Abrir modal de edición / vista
  const handleOpenEdit = useCallback((venta, viewOnly = false) => {
    setSelectedVenta(venta);
    setIsViewOnly(viewOnly);
    setShowEditModal(true);
  }, []);

  // Guardar edición (solo estado)
  const handleSaveEdit = async (updatedData) => {
    try {
      await update(selectedVenta.id, { ...selectedVenta, estado_pago: updatedData.estado_pago });
      setShowEditModal(false);
      setSelectedVenta(null);
    } catch (err) {
      alert('Error al actualizar la orden de servicio');
    }
  };

  // Abrir modal de PDF
  const handleOpenPdf = useCallback((venta) => {
    setSelectedVenta(venta);
    setShowPdfModal(true);
  }, []);

  return (
    <div className="ventas-page">
      {/* Header de la sección */}
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-cash-coin section-title-icon"></i>
            Gestión de Ventas
          </h1>
          <p className="section-subtitle">
            Administra las órdenes de servicio y pagos
          </p>
        </div>
        <button
          className="btn eco-btn-primary"
          onClick={handleOpenCreate}
        >
          <i className="bi bi-plus-circle-fill me-2"></i>
          Generar OS
        </button>
      </div>

      {/* KPIs */}
      {!loading && <VentaKPIs ventas={ventas} />}

      {/* Loading & Error */}
      {loading && <div className="text-center my-5"><span className="spinner-border text-success"></span><p>Cargando ventas...</p></div>}
      {error && <div className="alert alert-danger mx-4">{error}</div>}

      {/* Tabla */}
      {!loading && !error && (
        <VentaTable
          ventas={ventas}
          onEdit={handleOpenEdit}
          onViewPdf={handleOpenPdf}
        />
      )}

      {/* Modal Crear */}
      <VentaModal
        show={showCreateModal}
        clientes={clientes}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveCreate}
      />

      {/* Modal Editar / Ver */}
      <VentaEditModal
        show={showEditModal}
        isViewOnly={isViewOnly}
        venta={selectedVenta}
        onClose={() => {
          setShowEditModal(false);
          setSelectedVenta(null);
        }}
        onSave={handleSaveEdit}
      />

      {/* Modal PDF */}
      <VentaPdfModal
        show={showPdfModal}
        venta={selectedVenta}
        onClose={() => {
          setShowPdfModal(false);
          setSelectedVenta(null);
        }}
      />
    </div>
  );
}

export default VentasPage;
