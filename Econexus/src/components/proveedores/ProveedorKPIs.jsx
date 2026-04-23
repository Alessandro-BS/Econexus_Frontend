import { useEffect, useRef } from 'react';

/**
 * Tarjetas KPI para la sección de proveedores.
 * Muestra: Total, Activos, Inactivos, Nuevos este mes.
 */
function ProveedorKPIs({ proveedores }) {
  const total = proveedores.length;
  const activos = proveedores.filter((p) => p.estado === 'ACTIVO').length;
  const inactivos = proveedores.filter((p) => p.estado === 'INACTIVO').length;

  // Calcular proveedores registrados este mes
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const nuevosEsteMes = proveedores.filter((p) => {
    const fecha = new Date(p.fechaRegistro);
    return fecha.getMonth() === currentMonth && fecha.getFullYear() === currentYear;
  }).length;

  const kpis = [
    {
      id: 'kpi-total',
      label: 'Total de Proveedores',
      value: total,
      icon: 'bi-truck-front-fill',
      color: '#1565C0',
      bgColor: '#E3F2FD',
      borderColor: '#1565C0',
    },
    {
      id: 'kpi-activos',
      label: 'Activos',
      value: activos,
      icon: 'bi-check-circle-fill',
      color: '#2E7D32',
      bgColor: '#E8F5E9',
      borderColor: '#2E7D32',
    },
    {
      id: 'kpi-inactivos',
      label: 'Inactivos',
      value: inactivos,
      icon: 'bi-x-circle-fill',
      color: '#E65100',
      bgColor: '#FFF3E0',
      borderColor: '#E65100',
    },
    {
      id: 'kpi-nuevos',
      label: 'Nuevos Este Mes',
      value: nuevosEsteMes,
      icon: 'bi-plus-circle-fill',
      color: '#7B1FA2',
      bgColor: '#F3E5F5',
      borderColor: '#7B1FA2',
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {kpis.map((kpi, index) => (
        <div className="col-12 col-md-6 col-lg-3" key={kpi.id}>
          <KPICard kpi={kpi} delay={index * 100} />
        </div>
      ))}
    </div>
  );
}

function KPICard({ kpi, delay }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      const timeout = setTimeout(() => {
        el.style.transition = 'all 0.5s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="kpi-card animate-fade-in-up"
      style={{ borderLeftColor: kpi.borderColor }}
    >
      <div className="kpi-card-body">
        <div className="kpi-info">
          <span className="kpi-label">{kpi.label}</span>
          <span className="kpi-value" style={{ color: kpi.color }}>
            {kpi.value}
          </span>
        </div>
        <div
          className="kpi-icon-wrapper"
          style={{ backgroundColor: kpi.bgColor }}
        >
          <i
            className={`bi ${kpi.icon}`}
            style={{ color: kpi.color, fontSize: '1.6rem' }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default ProveedorKPIs;
