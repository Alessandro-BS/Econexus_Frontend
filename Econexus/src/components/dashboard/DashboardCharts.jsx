import { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, Legend 
} from 'recharts';

// Agregamos = [] por si acaso la variable llega vacía
function DashboardCharts({ reportes = [], ventas = [] }) {
  
  const datosReportesEstado = useMemo(() => {
    const conteo = { 'PENDIENTE': 0, 'EN PROCESO': 0, 'CUMPLIDO': 0, 'OBSERVADO': 0 };
    
    // Si reportes es válido, cuenta. Si no, no hace nada pero no explota.
    reportes.forEach(r => {
      const estado = r.estado ? r.estado.toUpperCase() : null;
      if (estado && conteo[estado] !== undefined) {
        conteo[estado]++;
      }
    });

    return [
      { name: 'Pendientes', value: conteo['PENDIENTE'], color: '#FF8042' },
      { name: 'En Proceso', value: conteo['EN PROCESO'], color: '#0088FE' },
      { name: 'Cumplidos', value: conteo['CUMPLIDO'], color: '#00C49F' },
      { name: 'Observados', value: conteo['OBSERVADO'], color: '#FFBB28' },
    ];
  }, [reportes]);

  const datosServicios = useMemo(() => {
    const nombresServicios = {
      1: 'Fumigación', 2: 'Desinfección', 3: 'Líquidos', 4: 'Sólidos', 5: 'Desinsectación'
    };
    const conteoServicios = {};

    ventas.forEach(v => {
      if(v) {
        const idServicio = v.tipo_servicio_id || (v.id % 5) + 1; 
        const nombre = nombresServicios[idServicio] || 'Otros';
        conteoServicios[nombre] = (conteoServicios[nombre] || 0) + 1;
      }
    });

    return Object.keys(conteoServicios).map(key => ({
      nombre: key,
      cantidad: conteoServicios[key]
    })).sort((a, b) => b.cantidad - a.cantidad).slice(0, 5);
  }, [ventas]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="row g-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <div className="col-12 col-xl-4">
        <div className="card shadow-sm border-0 p-4 h-100">
          <h5 className="card-title mb-4">Reportes por Estado</h5>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={datosReportesEstado}
                  cx="50%" cy="50%"
                  innerRadius={60} outerRadius={80}
                  paddingAngle={5} dataKey="value"
                >
                  {datosReportesEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-8">
        <div className="card shadow-sm border-0 p-4 h-100">
          <h5 className="card-title mb-4">Servicios más Solicitados</h5>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={datosServicios}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip cursor={{fill: '#f5f5f5'}} />
                <Bar dataKey="cantidad" radius={[4, 4, 0, 0]}>
                  {datosServicios.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;