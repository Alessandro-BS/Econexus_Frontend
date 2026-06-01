import { useState } from 'react';
import useApiCrud from '../../hooks/useApiCrud';
import NormativaTable from './NormativaTable';
import NormativaModal from './NormativaModal';
import NormativaDeleteModal from './NormativaDeleteModal';
import './NormativasPage.css';

function NormativasPage() {
  const { data: normativas, loading, error, create, update, remove } = useApiCrud('/normativas');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNormativa, setSelectedNormativa] = useState(null);

  const handleCreate = async (formData) => {
    const success = await create(formData);
    if (success) setShowModal(false);
  };

  const handleUpdate = async (formData) => {
    const success = await update(selectedNormativa.id, formData);
    if (success) {
      setShowModal(false);
      setSelectedNormativa(null);
    }
  };

  const handleDelete = async (id) => {
    const success = await remove(id);
    if (success) setShowDeleteModal(false);
  };

  const openCreateModal = () => {
    setSelectedNormativa(null);
    setShowModal(true);
  };

  const openEditModal = (normativa) => {
    setSelectedNormativa(normativa);
    setShowModal(true);
  };

  const openDeleteModal = (normativa) => {
    setSelectedNormativa(normativa);
    setShowDeleteModal(true);
  };

  return (
    <div className="normativas-page">
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-journal-bookmark-fill section-title-icon"></i>
            Normativas
          </h1>
          <p className="section-subtitle">
            Marco legal de autorizaciones y documentos de servicios ambientales.
          </p>
        </div>
        <div className="section-header-right">
          <button className="btn eco-btn-primary" onClick={openCreateModal}>
            <i className="bi bi-plus-lg me-2"></i>
            Agregar Normativa
          </button>
        </div>
      </div>

      {loading && <div className="text-center my-5"><span className="spinner-border text-success"></span><p>Cargando normativas...</p></div>}
      {error && <div className="alert alert-danger mx-4">{error}</div>}
      {!loading && !error && (
        <NormativaTable 
          normativas={normativas} 
          onEdit={openEditModal} 
          onDelete={openDeleteModal} 
        />
      )}

      <NormativaModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={selectedNormativa ? handleUpdate : handleCreate}
        normativaToEdit={selectedNormativa}
      />

      <NormativaDeleteModal
        show={showDeleteModal}
        normativa={selectedNormativa}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default NormativasPage;
