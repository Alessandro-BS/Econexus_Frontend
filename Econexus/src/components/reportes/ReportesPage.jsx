import { useState, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import reportesSeed from '../../data/reportesSeed';
import clientesSeed from '../../data/clientesSeed';
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
  const [reportes, setReportes] = useLocalStorage('eco_reportes_v3', reportesSeed);
  const [clientes] = useLocalStorage('eco_clientes_v2', clientesSeed);

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
  const handleSave = (formData) => {
    if (reporteToEdit) {
      setReportes((prev) =>
        prev.map((r) =>
          r.id === reporteToEdit.id ? { ...r, ...formData } : r
        )
      );
    } else {
      const newId =
        reportes.length > 0 ? Math.max(...reportes.map((r) => r.id)) + 1 : 1;
      const newReporte = { id: newId, ...formData };
      setReportes((prev) => [...prev, newReporte]);
    }
    setShowModal(false);
    setReporteToEdit(null);
  };

  // Abrir modal de eliminacion
  const handleOpenDelete = useCallback((reporte) => {
    setReporteToDelete(reporte);
    setShowDeleteModal(true);
  }, []);

  // Confirmar eliminacion
  const handleConfirmDelete = (id) => {
    setReportes((prev) => prev.filter((r) => r.id !== id));
    setShowDeleteModal(false);
    setReporteToDelete(null);
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
      <ReporteKPIs reportes={reportes} />

      {/* Tabla */}
      <ReporteTable
        reportes={reportes}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

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
