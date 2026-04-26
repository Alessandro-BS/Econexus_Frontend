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

  return (
    <div className="dashboard-page">
      <div className="section-header animate-fade-in-up">
        <div className="section-header-left">
          <h1 className="section-title">
            <i className="bi bi-graph-up-arrow section-title-icon me-3"></i>
            Panel de Control General
          </h1>
          <p className="section-subtitle">
            Visualización de métricas clave y tendencias de servicios
          </p>
        </div>
      </div>

      {/* Aquí está la magia de seguridad: garantizamos que siempre sean Arrays */}
      <DashboardKPIs ventas={ventas || []} clientes={clientes || []} />
      <DashboardCharts reportes={reportes || []} ventas={ventas || []} />
    </div>
  );
}

export default DashboardPage;