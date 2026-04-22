import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import ClientesPage from './components/clientes/ClientesPage';
import VentasPage from './components/ventas/VentasPage';
import PlaceholderPage from './components/common/PlaceholderPage';
import LoginPage from './components/auth/LoginPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('eco_authenticated') === 'true'
  );

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem('eco_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('eco_authenticated');
  };

  // Si no está autenticado, mostrar solo la página de Login
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="eco-app-layout">
      {/* Overlay para cerrar sidebar en móvil */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} onLogout={handleLogout} />

      {/* Contenido principal */}
      <div className="eco-main-wrapper">
        <TopBar onToggleSidebar={toggleSidebar} />
        <main className="eco-main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/clientes" replace />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/dashboard" element={<PlaceholderPage section="dashboard" />} />
            <Route path="/proveedores" element={<PlaceholderPage section="proveedores" />} />
            <Route path="/reportes" element={<PlaceholderPage section="reportes" />} />
            <Route path="/normativas" element={<PlaceholderPage section="normativas" />} />
            <Route path="/ventas" element={<VentasPage />} />
            <Route path="*" element={<Navigate to="/clientes" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
