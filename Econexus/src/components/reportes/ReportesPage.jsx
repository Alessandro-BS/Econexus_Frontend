import { useState, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import reportesSeed from '../../data/reportesSeed';
import clientesSeed from '../../data/clientesSeed';
import ReporteKPIs from './ReporteKPIs';
import ReporteTable from './ReporteTable';
import ReporteModal from './ReporteModal';
import ServicioModal from './ServicioModal';
import ReporteDeleteModal from './ReporteDeleteModal';
import './ReportesPage.css';

/**
 * Página principal de Gestión de Reportes.
 * CRUD completo con persistencia en localStorage.
 */
function ReportesPage() {
  const [reportes, setReportes] = useLocalStorage('eco_reportes_v3', reportesSeed);
  const [servicios, setServicios] = useLocalStorage('eco_servicios_v1', []);
  const [clientes] = useLocalStorage('eco_clientes_v2', clientesSeed);

  // Estado de modales
  const [showModal, setShowModal] = useState(false);
  const [showServicioModal, setShowServicioModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reporteToEdit, setReporteToEdit] = useState(null);
  const [reporteToDelete, setReporteToDelete] = useState(null);

  // Abrir modal para crear
  const handleOpenCreate = () => {
    setReporteToEdit(null);
    setShowModal(true);
  };

  // Abrir modal para crear servicio
  const handleOpenServicioCreate = () => {
    setShowServicioModal(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = useCallback((reporte) => {
    setReporteToEdit(reporte);
    setShowModal(true);
  }, []);

  // Guardar (crear o editar)
  const handleSave = (formData) => {
    if (reporteToEdit) {
      // Editar
      setReportes((prev) =>
        prev.map((r) =>
          r.id === reporteToEdit.id ? { ...r, ...formData } : r
        )
      );
    } else {
      // Crear
      const newId =
        reportes.length > 0 ? Math.max(...reportes.map((r) => r.id)) + 1 : 1;
      const newReporte = { id: newId, ...formData };
      setReportes((prev) => [...prev, newReporte]);
    }
    setShowModal(false);
    setReporteToEdit(null);
  };

  // Guardar servicio y reflejarlo automaticamente como reporte
  const handleSaveServicio = (formData) => {
    const newServicioId =
      servicios.length > 0 ? Math.max(...servicios.map((s) => s.id)) + 1 : 1;

    const newServicio = {
      id: newServicioId,
      ...formData,
      fecha_registro: formData.fecha,
      cantidad: 1,
      unidad_medida: 'Servicio',
    };

    const newReporteId =
      reportes.length > 0 ? Math.max(...reportes.map((r) => r.id)) + 1 : 1;

    const newReporte = {
      id: newReporteId,
      fecha_registro: formData.fecha,
      servicio_id: newServicioId,
      cliente_id: formData.cliente_id,
      cliente_nombre: formData.cliente_nombre,
      tipo_servicio: formData.tipo_servicio,
      descripcion: formData.descripcion,
      cantidad: 1,
      unidad_medida: 'Servicio',
      monto: formData.monto,
      estado: formData.estado,
    };

    setServicios((prev) => [...prev, newServicio]);
    setReportes((prev) => [...prev, newReporte]);
    setShowServicioModal(false);
  };

  // Abrir modal de eliminación
  const handleOpenDelete = useCallback((reporte) => {
    setReporteToDelete(reporte);
    setShowDeleteModal(true);
  }, []);

  // Confirmar eliminación
  const handleConfirmDelete = (id) => {
    setReportes((prev) => prev.filter((r) => r.id !== id));
    setShowDeleteModal(false);
    setReporteToDelete(null);
  };

  return (
    <div className="reportes-page">
      {/* Header de la sección */}
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-clipboard2-data-fill section-title-icon"></i>
            Gestión de Reportes
          </h1>
          <p className="section-subtitle">
            Administra los reportes de saneamiento ambiental
          </p>
        </div>
        <div className="section-actions">
          <button
            className="btn eco-btn-secondary"
            onClick={handleOpenServicioCreate}
            id="btn-add-servicio"
          >
            <i className="bi bi-briefcase-fill me-2"></i>
            Agregar Servicio
          </button>
          <button
            className="btn eco-btn-primary"
            onClick={handleOpenCreate}
            id="btn-add-reporte"
          >
            <i className="bi bi-file-earmark-plus-fill me-2"></i>
            Generar Reporte
          </button>
        </div>
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
      <ReporteModal
        show={showModal}
        servicios={servicios}
        onClose={() => {
          setShowModal(false);
          setReporteToEdit(null);
        }}
        onSave={handleSave}
        reporteToEdit={reporteToEdit}
      />

      {/* Modal Crear Servicio */}
      {showServicioModal && (
        <ServicioModal
          show={showServicioModal}
          clientes={clientes}
          onClose={() => setShowServicioModal(false)}
          onSave={handleSaveServicio}
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
