import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import ventasSeed from '../../data/ventasSeed';
import clientesSeed from '../../data/clientesSeed';
import reportesSeed from '../../data/reportesSeed';
import DashboardKPIs from './DashboardKPIs';
import DashboardCharts from './DashboardCharts';
import './DashboardPage.css'; 

function DashboardPage() {
  const [ventas] = useLocalStorage('eco_ventas', ventasSeed);
  const [clientes] = useLocalStorage('eco_clientes', clientesSeed);
  const [reportes] = useLocalStorage('eco_reportes', reportesSeed);

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

      <DashboardKPIs ventas={ventas || []} clientes={clientes || []} filtro={filtroTiempo} />
      <DashboardCharts reportes={reportes || []} ventas={ventas || []} filtro={filtroTiempo} />
    </div>
  );
}

export default DashboardPage;