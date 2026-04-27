import { useEffect, useRef } from 'react';

/**
 * Tarjetas KPI para la sección de usuarios.
 * Muestra: Total, Activos, Inactivos.
 */
function UsuarioKPIs({ usuarios }) {
  const total = usuarios.length;
  const activos = usuarios.filter((u) => u.estado === 'ACTIVO').length;
  const inactivos = usuarios.filter((u) => u.estado === 'INACTIVO').length;

  const kpis = [
    {
      id: 'kpi-total',
      label: 'Total de Usuarios',
      value: total,
      icon: 'bi-person-badge',
      color: '#1565C0',
      bgColor: '#E3F2FD',
      borderColor: '#1565C0',
    },
    {
      id: 'kpi-activos',
      label: 'Usuarios Activos',
      value: activos,
      icon: 'bi-person-check-fill',
      color: '#2E7D32',
      bgColor: '#E8F5E9',
      borderColor: '#2E7D32',
    },
    {
      id: 'kpi-inactivos',
      label: 'Usuarios Inactivos',
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

/**
 * Componente individual para una tarjeta KPI.
 */
function KPICard({ kpi, delay }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    cardRef.current.style.animation = `fadeInUp 0.6s ease-out ${delay}ms both`;
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="kpi-card"
      style={{
        borderLeftColor: kpi.borderColor,
      }}
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

export default UsuarioKPIs;
