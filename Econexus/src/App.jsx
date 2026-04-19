import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import ClientesPage from './components/clientes/ClientesPage';
import PlaceholderPage from './components/common/PlaceholderPage';

function App() {
  return (
    <div className="eco-app-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="eco-main-wrapper">
        <TopBar />
        <main className="eco-main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/clientes" replace />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/dashboard" element={<PlaceholderPage section="dashboard" />} />
            <Route path="/proveedores" element={<PlaceholderPage section="proveedores" />} />
            <Route path="/reportes" element={<PlaceholderPage section="reportes" />} />
            <Route path="/normativas" element={<PlaceholderPage section="normativas" />} />
            <Route path="/ventas" element={<PlaceholderPage section="ventas" />} />
            <Route path="*" element={<Navigate to="/clientes" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
