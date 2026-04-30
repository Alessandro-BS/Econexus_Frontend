import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import ClientesPage from './components/clientes/ClientesPage';
import ProveedoresPage from './components/proveedores/ProveedoresPage';
import VentasPage from './components/ventas/VentasPage';
import UsuariosPage from './components/usuarios/UsuariosPage';
import NormativasPage from './components/normativas/NormativasPage';
import ReportesPage from './components/reportes/ReportesPage';
import PlaceholderPage from './components/common/PlaceholderPage';
import LoginPage from './components/auth/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import ScrollToTop from './components/common/ScrollToTop';
import PublicLayout from './components/layout/PublicLayout';
import HomePage from './pages/public/HomePage';
import NosotrosPage from './pages/public/NosotrosPage';
import CatalogoServiciosPage from './pages/public/CatalogoServiciosPage';
import GaleriaPage from './pages/public/GaleriaPage';
import ContactoPage from './pages/public/ContactoPage';

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

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rutas públicas con Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/servicios" element={<CatalogoServiciosPage />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Route>

        {/* Ruta de Login (redirecciona si ya está autenticado) */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />} 
        />

      {/* Rutas privadas */}
      <Route 
        path="/*" 
        element={
          isAuthenticated ? (
            <div className="eco-app-layout">
              {/* Overlay para cerrar sidebar en móvil */}
              {sidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebar}></div>
              )}

              <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} onLogout={handleLogout} />

              {/* Contenido principal */}
              <div className="eco-main-wrapper">
                <TopBar onToggleSidebar={toggleSidebar} onLogout={handleLogout} />
                <main className="eco-main-content">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/clientes" element={<ClientesPage />} />
                    <Route path="/proveedores" element={<ProveedoresPage />} />
                    <Route path="/reportes" element={<ReportesPage />} />
                    <Route path="/normativas" element={<NormativasPage />} />
                    <Route path="/usuarios" element={<UsuariosPage />} />
                    <Route path="/ventas" element={<VentasPage />} />
                    <Route path="*" element={<Navigate to="/clientes" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
            </Routes>
    </>
  );
}

export default App;
