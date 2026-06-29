import { useState, useCallback } from 'react';
import useApiCrud from '../../hooks/useApiCrud';
import proveedoresSeed from '../../data/proveedoresSeed';
import ProveedorKPIs from './ProveedorKPIs';
import ProveedorTable from './ProveedorTable';
import ProveedorModal from './ProveedorModal';
import ProveedorDeleteModal from './ProveedorDeleteModal';
import './ProveedoresPage.css';

/**
 * Página principal de Gestión de Proveedores.
 * Consumiendo API REST
 */
function ProveedoresPage() {
  const { data: proveedores, loading, error, create, update, remove } = useApiCrud('/proveedores');

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
  const handleSave = async (formData) => {
    try {
      if (proveedorToEdit) {
        // Editar
        await update(proveedorToEdit.id, formData);
      } else {
        // Crear
        await create(formData);
      }
      setShowModal(false);
      setProveedorToEdit(null);
    } catch (err) {
      alert('Error al guardar el proveedor');
    }
  };

  // Abrir modal de desactivación
  const handleOpenDelete = useCallback((proveedor) => {
    setProveedorToDelete(proveedor);
    setShowDeleteModal(true);
  }, []);

  // Confirmar desactivación
  const handleConfirmDelete = async (id) => {
    try {
      await remove(id);
      setShowDeleteModal(false);
      setProveedorToDelete(null);
    } catch (err) {
      alert('Error al eliminar el proveedor');
    }
  };

  // Reactivar proveedor (opcional, en backend debería haber un endpoint o se usa update)
  const handleReactivate = async (id) => {
    try {
      const proveedorActual = proveedores.find(p => p.id === id);
      if (proveedorActual) {
        await update(id, { ...proveedorActual, estado: 'ACTIVO' });
      }
    } catch (err) {
      alert('Error al reactivar');
    }
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
      {!loading && <ProveedorKPIs proveedores={proveedores} />}

      {/* Loading & Error */}
      {loading && <div className="text-center my-5"><span className="spinner-border text-success"></span><p>Cargando proveedores...</p></div>}
      {error && <div className="alert alert-danger mx-4">{error}</div>}

      {/* Tabla */}
      {!loading && !error && (
        <ProveedorTable
          proveedores={proveedores}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onReactivate={handleReactivate}
        />
      )}

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
