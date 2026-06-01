import { useState } from 'react';
import useApiCrud from '../../hooks/useApiCrud';
import DashboardKPIs from './DashboardKPIs';
import DashboardCharts from './DashboardCharts';
import './DashboardPage.css'; 

function DashboardPage() {
  const { data: ventas, loading: loadingVentas } = useApiCrud('/ordenes');
  const { data: clientes, loading: loadingClientes } = useApiCrud('/clientes');
  const { data: reportes, loading: loadingReportes } = useApiCrud('/reportes');
  const isLoading = loadingVentas || loadingClientes || loadingReportes;

  // Estado para el filtro 
  const [filtroTiempo, setFiltroTiempo] = useState('todos');

  return (
    <div className="dashboard-page">
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-graph-up-arrow section-title-icon me-3"></i>
            Panel de Control General
          </h1>
          <p className="section-subtitle">Visualización de métricas clave y tendencias</p>
        </div>
        
        {/* El desplegable que querías */}
        <div className="section-header-right">
          <div className="search-container">
            <i className="bi bi-calendar3 search-icon"></i>
            <select 
              className="form-select filter-select" 
              value={filtroTiempo}
              onChange={(e) => setFiltroTiempo(e.target.value)}
            >
              <option value="todos">Todo el historial</option>
              <option value="mes">Este mes</option>
              <option value="semestre">Últimos 6 meses</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && <div className="text-center my-5"><span className="spinner-border text-success"></span><p>Cargando panel...</p></div>}
      {!isLoading && (
        <>
          <DashboardKPIs ventas={ventas || []} clientes={clientes || []} filtro={filtroTiempo} />
          <DashboardCharts reportes={reportes || []} ventas={ventas || []} filtro={filtroTiempo} />
        </>
      )}
    </div>
  );
}

export default DashboardPage;