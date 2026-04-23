import { useState, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import proveedoresSeed from '../../data/proveedoresSeed';
import ProveedorKPIs from './ProveedorKPIs';
import ProveedorTable from './ProveedorTable';
import ProveedorModal from './ProveedorModal';
import ProveedorDeleteModal from './ProveedorDeleteModal';
import './ProveedoresPage.css';

/**
 * Página principal de Gestión de Proveedores.
 * CRUD completo con persistencia en localStorage.
 */
function ProveedoresPage() {
  const [proveedores, setProveedores] = useLocalStorage('econexus_proveedores', proveedoresSeed);

  // Estado de modales
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [proveedorToEdit, setProveedorToEdit] = useState(null);
  const [proveedorToDelete, setProveedorToDelete] = useState(null);

  // Abrir modal para crear
  const handleOpenCreate = () => {
    setProveedorToEdit(null);
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = useCallback((proveedor) => {
    setProveedorToEdit(proveedor);
    setShowModal(true);
  }, []);

  // Guardar (crear o editar)
  const handleSave = (formData) => {
    if (proveedorToEdit) {
      // Editar
      setProveedores((prev) =>
        prev.map((p) =>
          p.id === proveedorToEdit.id ? { ...p, ...formData } : p
        )
      );
    } else {
      // Crear
      const newId =
        proveedores.length > 0 ? Math.max(...proveedores.map((p) => p.id)) + 1 : 1;
      const fechaRegistro = new Date().toISOString().split('T')[0];
      const newProveedor = { id: newId, ...formData, fechaRegistro };
      setProveedores((prev) => [...prev, newProveedor]);
    }
    setShowModal(false);
    setProveedorToEdit(null);
  };

  // Abrir modal de desactivación
  const handleOpenDelete = useCallback((proveedor) => {
    setProveedorToDelete(proveedor);
    setShowDeleteModal(true);
  }, []);

  // Confirmar desactivación
  const handleConfirmDelete = (id) => {
    setProveedores((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: 'INACTIVO' } : p))
    );
    setShowDeleteModal(false);
    setProveedorToDelete(null);
  };

  // Reactivar proveedor
  const handleReactivate = (id) => {
    setProveedores((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: 'ACTIVO' } : p))
    );
  };

  return (
    <div className="proveedores-page">
      {/* Header de la sección */}
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-truck-front-fill section-title-icon"></i>
            Gestión de Proveedores
          </h1>
          <p className="section-subtitle">
            Administra tus proveedores de servicios y productos de saneamiento ambiental
          </p>
        </div>
        <button
          className="btn eco-btn-primary"
          onClick={handleOpenCreate}
          id="btn-add-proveedor"
        >
          <i className="bi bi-plus-circle-fill me-2"></i>
          Añadir Nuevo Proveedor
        </button>
      </div>

      {/* KPIs */}
      <ProveedorKPIs proveedores={proveedores} />

      {/* Tabla */}
      <ProveedorTable
        proveedores={proveedores}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onReactivate={handleReactivate}
      />

      {/* Modal Crear/Editar */}
      <ProveedorModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setProveedorToEdit(null);
        }}
        onSave={handleSave}
        proveedorToEdit={proveedorToEdit}
      />

      {/* Modal Desactivar */}
      <ProveedorDeleteModal
        show={showDeleteModal}
        proveedor={proveedorToDelete}
        onClose={() => {
          setShowDeleteModal(false);
          setProveedorToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ProveedoresPage;
