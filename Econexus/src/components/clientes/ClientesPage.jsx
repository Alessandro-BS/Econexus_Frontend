import { useState, useCallback } from 'react';
import useApiCrud from '../../hooks/useApiCrud';
import ClienteKPIs from './ClienteKPIs';
import ClienteTable from './ClienteTable';
import ClienteModal from './ClienteModal';
import ClienteDeleteModal from './ClienteDeleteModal';
import './ClientesPage.css';

/**
 * Página principal de Gestión de Clientes.
 * Consumiendo API REST de Spring Boot.
 */
function ClientesPage() {
  const { data: clientes, loading, error, create, update, remove } = useApiCrud('/clientes');

  // Estado de modales
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clienteToEdit, setClienteToEdit] = useState(null);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  // Abrir modal para crear
  const handleOpenCreate = () => {
    setClienteToEdit(null);
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = useCallback((cliente) => {
    setClienteToEdit(cliente);
    setShowModal(true);
  }, []);

  // Guardar (crear o editar)
  const handleSave = async (formData) => {
    try {
      if (clienteToEdit) {
        // Editar
        await update(clienteToEdit.id, formData);
      } else {
        // Crear
        await create(formData);
      }
      setShowModal(false);
      setClienteToEdit(null);
    } catch (err) {
      alert('Ocurrió un error al guardar el cliente');
    }
  };

  // Abrir modal de eliminación
  const handleOpenDelete = useCallback((cliente) => {
    setClienteToDelete(cliente);
    setShowDeleteModal(true);
  }, []);

  // Confirmar eliminación
  const handleConfirmDelete = async (id) => {
    try {
      await remove(id);
      setShowDeleteModal(false);
      setClienteToDelete(null);
    } catch (err) {
      alert('Ocurrió un error al eliminar el cliente');
    }
  };

  return (
    <div className="clientes-page">
      {/* Header de la sección */}
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-people-fill section-title-icon"></i>
            Gestión de Clientes
          </h1>
          <p className="section-subtitle">
            Administra la información de tus clientes empresariales
          </p>
        </div>
        <button
          className="btn eco-btn-primary"
          onClick={handleOpenCreate}
          id="btn-add-cliente"
        >
          <i className="bi bi-plus-circle-fill me-2"></i>
          Añadir Nuevo Cliente
        </button>
      </div>

      {/* KPIs */}
      {!loading && <ClienteKPIs clientes={clientes} />}

      {/* Loading & Error */}
      {loading && <div className="text-center my-5"><span className="spinner-border text-success"></span><p>Cargando clientes...</p></div>}
      {error && <div className="alert alert-danger mx-4">{error}</div>}

      {/* Tabla */}
      {!loading && !error && (
        <ClienteTable
          clientes={clientes}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {/* Modal Crear/Editar */}
      <ClienteModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setClienteToEdit(null);
        }}
        onSave={handleSave}
        clienteToEdit={clienteToEdit}
      />

      {/* Modal Eliminar */}
      <ClienteDeleteModal
        show={showDeleteModal}
        cliente={clienteToDelete}
        onClose={() => {
          setShowDeleteModal(false);
          setClienteToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ClientesPage;
