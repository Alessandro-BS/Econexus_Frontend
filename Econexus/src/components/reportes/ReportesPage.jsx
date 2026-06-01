import { useState, useCallback } from 'react';
import useApiCrud from '../../hooks/useApiCrud';
import ReporteKPIs from './ReporteKPIs';
import ReporteTable from './ReporteTable';
import ReporteModal from './ReporteModal';
import ReporteDeleteModal from './ReporteDeleteModal';
import './ReportesPage.css';

/**
 * Pagina principal de Gestion de Reportes.
 * CRUD completo con persistencia en localStorage.
 * // agregar un comentario en cualquier archivo
 */
function ReportesPage() {
  const { data: reportes, loading, error, create, update, remove } = useApiCrud('/reportes');
  const { data: clientes } = useApiCrud('/clientes');

  // Estado de modales
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reporteToEdit, setReporteToEdit] = useState(null);
  const [reporteToDelete, setReporteToDelete] = useState(null);

  // Abrir modal para crear
  const handleOpenCreate = () => {
    setReporteToEdit(null);
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = useCallback((reporte) => {
    setReporteToEdit(reporte);
    setShowModal(true);
  }, []);

  // Guardar (crear o editar)
  const handleSave = async (formData) => {
    try {
      if (reporteToEdit) {
        await update(reporteToEdit.id, formData);
      } else {
        await create(formData);
      }
      setShowModal(false);
      setReporteToEdit(null);
    } catch (err) {
      alert('Error al guardar el reporte');
    }
  };

  // Abrir modal de eliminacion
  const handleOpenDelete = useCallback((reporte) => {
    setReporteToDelete(reporte);
    setShowDeleteModal(true);
  }, []);

  // Confirmar eliminacion
  const handleConfirmDelete = async (id) => {
    try {
      await remove(id);
      setShowDeleteModal(false);
      setReporteToDelete(null);
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="reportes-page">
      {/* Header de la seccion */}
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-clipboard2-data-fill section-title-icon"></i>
            Gestion de Reportes
          </h1>
          <p className="section-subtitle">
            Administra los reportes de saneamiento ambiental
          </p>
        </div>
        <button
          className="btn eco-btn-primary"
          onClick={handleOpenCreate}
          id="btn-add-reporte"
        >
          <i className="bi bi-file-earmark-plus-fill me-2"></i>
          Generar Reporte
        </button>
      </div>

      {/* KPIs */}
      {!loading && <ReporteKPIs reportes={reportes} />}

      {/* Loading & Error */}
      {loading && <div className="text-center my-5"><span className="spinner-border text-success"></span><p>Cargando reportes...</p></div>}
      {error && <div className="alert alert-danger mx-4">{error}</div>}

      {/* Tabla */}
      {!loading && !error && (
        <ReporteTable
          reportes={reportes}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {/* Modal Crear/Editar */}
      {showModal && (
        <ReporteModal
          show={showModal}
          clientes={clientes}
          onClose={() => {
            setShowModal(false);
            setReporteToEdit(null);
          }}
          onSave={handleSave}
          reporteToEdit={reporteToEdit}
        />
      )}

      {/* Modal Eliminar */}
      <ReporteDeleteModal
        show={showDeleteModal}
        reporte={reporteToDelete}
        onClose={() => {
          setShowDeleteModal(false);
          setReporteToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ReportesPage;
