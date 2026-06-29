import { useState, useCallback } from 'react';
import useApiCrud from '../../hooks/useApiCrud';
import usuariosSeed from '../../data/usuariosSeed';
import UsuarioKPIs from './UsuarioKPIs';
import UsuarioTable from './UsuarioTable';
import UsuarioModal from './UsuarioModal';
import UsuarioDeleteModal from './UsuarioDeleteModal';
import './UsuariosPage.css';

/**
 * Página principal de Gestión de Usuarios.
 * Consumiendo API REST
 */
function UsuariosPage() {
  const { data: usuarios, loading, error, create, update, remove } = useApiCrud('/usuarios');

  // Estado de modales
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usuarioToEdit, setUsuarioToEdit] = useState(null);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);

  // Abrir modal para crear
  const handleOpenCreate = () => {
    setUsuarioToEdit(null);
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = useCallback((usuario) => {
    setUsuarioToEdit(usuario);
    setShowModal(true);
  }, []);

  // Guardar (crear o editar)
  const handleSave = async (formData) => {
    try {
      if (usuarioToEdit) {
        // Editar
        await update(usuarioToEdit.id, formData);
      } else {
        // Crear
        await create(formData);
      }
      setShowModal(false);
      setUsuarioToEdit(null);
    } catch (err) {
      alert('Error al guardar el usuario');
    }
  };

  // Abrir modal de eliminación
  const handleOpenDelete = useCallback((usuario) => {
    setUsuarioToDelete(usuario);
    setShowDeleteModal(true);
  }, []);

  // Confirmar eliminación
  const handleConfirmDelete = async (id) => {
    try {
      await remove(id);
      setShowDeleteModal(false);
      setUsuarioToDelete(null);
    } catch (err) {
      alert('Error al eliminar el usuario');
    }
  };

  return (
    <div className="usuarios-page">
      {/* Header de la sección */}
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-person-badge section-title-icon"></i>
            Gestión de Usuarios
          </h1>
          <p className="section-subtitle">
            Administra los usuarios y permisos del sistema
          </p>
        </div>
        <button
          className="btn btn-success btn-lg add-button"
          onClick={handleOpenCreate}
          title="Agregar nuevo usuario"
        >
          <i className="bi bi-plus-circle-fill me-2"></i>
          Agregar Nuevo Usuario
        </button>
      </div>

      {/* KPIs */}
      {!loading && <UsuarioKPIs usuarios={usuarios} />}

      {/* Loading & Error */}
      {loading && <div className="text-center my-5"><span className="spinner-border text-success"></span><p>Cargando usuarios...</p></div>}
      {error && <div className="alert alert-danger mx-4">{error}</div>}

      {/* Tabla */}
      {!loading && !error && (
        <UsuarioTable
          usuarios={usuarios}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {/* Modales */}
      <UsuarioModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setUsuarioToEdit(null);
        }}
        onSave={handleSave}
        usuarioToEdit={usuarioToEdit}
      />

      <UsuarioDeleteModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setUsuarioToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        usuarioToDelete={usuarioToDelete}
      />
    </div>
  );
}

export default UsuariosPage;
