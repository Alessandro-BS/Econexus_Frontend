import { useState, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import ventasSeed from '../../data/ventasSeed';
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
  const [ventas, setVentas] = useLocalStorage('eco_ventas', ventasSeed);
  const [clientes] = useLocalStorage('eco_clientes', []);

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
  const handleSaveCreate = (formData) => {
    // Generar nuevo ID y código OS-2026-NNNN
    const currentYear = 2026; // Fijo a 2026 como se solicitó
    const newId = ventas.length > 0 ? Math.max(...ventas.map((v) => v.id)) + 1 : 1;
    const seq = String(newId).padStart(4, '0');
    const numero_orden = `OS-${currentYear}-${seq}`;

    const newVenta = {
      id: newId,
      numero_orden,
      ...formData,
    };

    setVentas((prev) => [...prev, newVenta]);
    setShowCreateModal(false);
  };

  // Abrir modal de edición / vista
  const handleOpenEdit = useCallback((venta, viewOnly = false) => {
    setSelectedVenta(venta);
    setIsViewOnly(viewOnly);
    setShowEditModal(true);
  }, []);

  // Guardar edición (solo estado)
  const handleSaveEdit = (updatedData) => {
    setVentas((prev) =>
      prev.map((v) =>
        v.id === selectedVenta.id ? { ...v, estado_pago: updatedData.estado_pago } : v
      )
    );
    setShowEditModal(false);
    setSelectedVenta(null);
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
            <i className="bi bi-cart-check-fill section-title-icon"></i>
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
      <VentaKPIs ventas={ventas} />

      {/* Tabla */}
      <VentaTable
        ventas={ventas}
        onEdit={handleOpenEdit}
        onViewPdf={handleOpenPdf}
      />

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
