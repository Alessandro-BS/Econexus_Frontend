import { useEffect, useRef } from 'react';

/**
 * Tarjetas KPI para la sección de clientes.
 * Muestra: Total, Activos, Inactivos.
 */
function ClienteKPIs({ clientes }) {
  const total = clientes.length;
  const activos = clientes.filter((c) => c.estado === 'ACTIVO').length;
  const inactivos = clientes.filter((c) => c.estado === 'INACTIVO').length;

  const kpis = [
    {
      id: 'kpi-total',
      label: 'Total de Clientes',
      value: total,
      icon: 'bi-people-fill',
      color: '#1565C0',
      bgColor: '#E3F2FD',
      borderColor: '#1565C0',
    },
    {
      id: 'kpi-activos',
      label: 'Clientes Activos',
      value: activos,
      icon: 'bi-person-check-fill',
      color: '#2E7D32',
      bgColor: '#E8F5E9',
      borderColor: '#2E7D32',
    },
    {
      id: 'kpi-inactivos',
      label: 'Clientes Inactivos',
      value: inactivos,
      icon: 'bi-person-dash-fill',
      color: '#E65100',
      bgColor: '#FFF3E0',
      borderColor: '#E65100',
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {kpis.map((kpi, index) => (
        <div className="col-12 col-md-4" key={kpi.id}>
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
      const timer = setTimeout(() => {
        el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="kpi-card"
      id={kpi.id}
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

export default ClienteKPIs;
