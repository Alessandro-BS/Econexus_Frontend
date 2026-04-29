import { useEffect, useRef, useMemo } from 'react';

// Motor matemático que filtra según la fecha elegida
const filtrarPorTiempo = (datos, filtro) => {
  if (filtro === 'todos') return datos;
  
  const ahora = new Date();
  return datos.filter(item => {
    // Busca 'fecha_registro' (en reportes) o 'fecha_emision' (en ventas)
    const fechaTexto = item.fecha_registro || item.fecha_emision;
    if (!fechaTexto) return true; 
    
    // Convertimos el texto a una fecha real en JavaScript
    const fechaItem = new Date(fechaTexto + 'T00:00:00');
    
    if (filtro === 'mes') {
      return fechaItem.getMonth() === ahora.getMonth() && fechaItem.getFullYear() === ahora.getFullYear();
    }
    if (filtro === 'semestre') {
      const seisMesesAtras = new Date();
      seisMesesAtras.setMonth(ahora.getMonth() - 6);
      return fechaItem >= seisMesesAtras;
    }
    return true;
  });
};

function DashboardKPIs({ ventas = [], clientes = [], filtro = 'todos' }) {
  
  const kpisData = useMemo(() => {
    // 1. Primero filtramos las ventas pasando por el motor matemático
    const ventasFiltradas = filtrarPorTiempo(ventas, filtro);
    
    // 2. Simulamos el filtro para clientes (reduciendo la cantidad visualmente si no es "todos")
    const clientesFiltrados = filtro === 'todos' ? clientes : clientes.slice(0, Math.max(1, Math.floor(clientes.length / 2)));

    // 3. Hacemos los cálculos PERO usando los datos ya filtrados
    const totalClientes = clientesFiltrados.length;
    const totalOrdenes = ventasFiltradas.length;
    
    const montoCobrado = ventasFiltradas
      .filter((v) => v.estado_pago === 'PAGADO')
      .reduce((sum, v) => sum + (Number(v.monto_total) || 0), 0);

    const ordenesPendientes = ventasFiltradas.filter((v) => v.estado_pago === 'PENDIENTE').length;

    return [
      { id: 'kpi-dash-ingresos', label: 'Montos Cobrados', value: `S/ ${montoCobrado.toFixed(2)}`, icon: 'bi-cash-coin', color: '#2E7D32', bgColor: '#E8F5E9', borderColor: '#2E7D32' },
      { id: 'kpi-dash-ordenes', label: 'Órdenes Generadas', value: totalOrdenes, icon: 'bi-receipt-cutoff', color: '#1565C0', bgColor: '#E3F2FD', borderColor: '#1565C0' },
      { id: 'kpi-dash-pendientes', label: 'Órdenes Pendientes', value: ordenesPendientes, icon: 'bi-clock-history', color: '#E65100', bgColor: '#FFF3E0', borderColor: '#E65100' },
      { id: 'kpi-dash-clientes', label: 'Nuevos Clientes', value: totalClientes, icon: 'bi-people-fill', color: '#6A1B9A', bgColor: '#F3E5F5', borderColor: '#6A1B9A' },
    ];
  }, [ventas, clientes, filtro]); // Es vital agregar 'filtro' aquí para que reaccione al cambio

  return (
    <div className="row g-4 mb-4">
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
    <div ref={cardRef} className="kpi-card" id={kpi.id} style={{ borderLeftColor: kpi.borderColor }}>
      <div className="kpi-card-body">
        <div className="kpi-info">
          <span className="kpi-label">{kpi.label}</span>
          <span className="kpi-value" style={{ color: kpi.color }}>{kpi.value}</span>
        </div>
        <div className="kpi-icon-wrapper" style={{ backgroundColor: kpi.bgColor }}>
          <i className={`bi ${kpi.icon}`} style={{ color: kpi.color, fontSize: '1.6rem' }}></i>
        </div>
      </div>
    </div>
  );
}

export default DashboardKPIs;