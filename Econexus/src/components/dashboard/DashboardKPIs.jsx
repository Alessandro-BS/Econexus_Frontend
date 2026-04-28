import { useEffect, useRef, useMemo } from 'react';

/**
 * Tarjetas de KPIs para el Dashboard Principal
 * Calcula montos cobrados, totales de órdenes y clientes.
 */
function DashboardKPIs({ ventas, clientes }) {
  const kpisData = useMemo(() => {
    const totalClientes = clientes.length;
    const totalOrdenes = ventas.length;

    // Calcular el monto total de las órdenes que ya están con estado 'PAGADO'
    const montoCobrado = ventas
      .filter((v) => v.estado_pago === 'PAGADO')
      .reduce((sum, v) => sum + (Number(v.monto_total) || 0), 0);

    const ordenesPendientes = ventas.filter((v) => v.estado_pago === 'PENDIENTE').length;

    return [
      {
        id: 'kpi-dash-ingresos',
        label: 'Montos Cobrados',
        value: `S/ ${montoCobrado.toFixed(2)}`,
        icon: 'bi-cash-coin',
        color: '#2E7D32', // Verde
        bgColor: '#E8F5E9',
        borderColor: '#2E7D32',
      },
      {
        id: 'kpi-dash-ordenes',
        label: 'Órdenes Generadas',
        value: totalOrdenes,
        icon: 'bi-receipt-cutoff',
        color: '#1565C0', // Azul
        bgColor: '#E3F2FD',
        borderColor: '#1565C0',
      },
      {
        id: 'kpi-dash-pendientes',
        label: 'Órdenes Pendientes',
        value: ordenesPendientes,
        icon: 'bi-clock-history',
        color: '#E65100', // Naranja
        bgColor: '#FFF3E0',
        borderColor: '#E65100',
      },
      {
        id: 'kpi-dash-clientes',
        label: 'Total Clientes',
        value: totalClientes,
        icon: 'bi-people-fill',
        color: '#6A1B9A', // Morado
        bgColor: '#F3E5F5',
        borderColor: '#6A1B9A',
      },
    ];
  }, [ventas, clientes]);

  return (
    <div className="row g-4 mb-4">
      {/* Cambiamos a col-md-3 para que quepan 4 tarjetas en la misma fila */}
      {kpisData.map((kpi, index) => (
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

export default DashboardKPIs;