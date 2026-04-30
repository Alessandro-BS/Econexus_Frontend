import { useState, useCallback, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import clientesSeed from '../../data/clientesSeed';
import ClienteKPIs from './ClienteKPIs';
import ClienteTable from './ClienteTable';
import ClienteModal from './ClienteModal';
import ClienteDeleteModal from './ClienteDeleteModal';
import './ClientesPage.css';

/**
 * Página principal de Gestión de Clientes.
 * CRUD completo con persistencia en localStorage.
 */
function ClientesPage() {
  const [clientes, setClientes] = useLocalStorage('eco_clientes_v2', clientesSeed);

  // Asegurar que la lista predeterminada se muestre si el storage está vacío
  useEffect(() => {
    if (clientes && clientes.length === 0) {
      setClientes(clientesSeed);
    }
  }, [clientes, setClientes]);

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
  const handleSave = (formData) => {
    if (clienteToEdit) {
      // Editar
      setClientes((prev) =>
        prev.map((c) =>
          c.id === clienteToEdit.id ? { ...c, ...formData } : c
        )
      );
    } else {
      // Crear
      const newId =
        clientes.length > 0 ? Math.max(...clientes.map((c) => c.id)) + 1 : 1;
      const newCliente = { id: newId, ...formData };
      setClientes((prev) => [...prev, newCliente]);
    }
    setShowModal(false);
    setClienteToEdit(null);
  };

  // Abrir modal de eliminación
  const handleOpenDelete = useCallback((cliente) => {
    setClienteToDelete(cliente);
    setShowDeleteModal(true);
  }, []);

  // Confirmar eliminación
  const handleConfirmDelete = (id) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
    setShowDeleteModal(false);
    setClienteToDelete(null);
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
      <ClienteKPIs clientes={clientes} />

      {/* Tabla */}
      <ClienteTable
        clientes={clientes}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

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
