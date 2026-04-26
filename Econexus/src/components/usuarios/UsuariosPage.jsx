import { useState, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import usuariosSeed from '../../data/usuariosSeed';
import UsuarioKPIs from './UsuarioKPIs';
import UsuarioTable from './UsuarioTable';
import UsuarioModal from './UsuarioModal';
import UsuarioDeleteModal from './UsuarioDeleteModal';
import './UsuariosPage.css';

/**
 * Página principal de Gestión de Usuarios.
 * CRUD completo con persistencia en localStorage.
 */
function UsuariosPage() {
  const [usuarios, setUsuarios] = useLocalStorage('eco_usuarios', usuariosSeed);

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
  const handleSave = (formData) => {
    if (usuarioToEdit) {
      // Editar
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === usuarioToEdit.id ? { ...u, ...formData } : u
        )
      );
    } else {
      // Crear
      const newId =
        usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;
      const newUsuario = { id: newId, ...formData };
      setUsuarios((prev) => [...prev, newUsuario]);
    }
    setShowModal(false);
    setUsuarioToEdit(null);
  };

  // Abrir modal de eliminación
  const handleOpenDelete = useCallback((usuario) => {
    setUsuarioToDelete(usuario);
    setShowDeleteModal(true);
  }, []);

  // Confirmar eliminación
  const handleConfirmDelete = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    setShowDeleteModal(false);
    setUsuarioToDelete(null);
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
          className="btn btn-success btn-lg add-button animate-bounce"
          onClick={handleOpenCreate}
          title="Agregar nuevo usuario"
        >
          <i className="bi bi-plus-circle-fill me-2"></i>
          Agregar Nuevo Usuario
        </button>
      </div>

      {/* KPIs */}
      <UsuarioKPIs usuarios={usuarios} />

      {/* Tabla */}
      <UsuarioTable
        usuarios={usuarios}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

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
