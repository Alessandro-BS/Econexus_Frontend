import { useState, useEffect } from 'react';
import usuariosSeed from '../../data/usuariosSeed';
import econexusLogo from '../../assets/econexus-sin-fondo.png';
import './LoginPage.css';

const LOCAL_STORAGE_USUARIOS_KEY = 'eco_usuarios';

const isValidUsuariosData = (data) =>
  Array.isArray(data) &&
  data.length > 0 &&
  data.every(
    (u) =>
      u &&
      typeof u === 'object' &&
      typeof u.email === 'string' &&
      typeof u.password === 'string' &&
      typeof u.nombre_completo === 'string' &&
      typeof u.estado === 'string'
  );

if (typeof window !== 'undefined') {
  try {
    const storedUsuarios = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USUARIOS_KEY) || 'null');
    if (!isValidUsuariosData(storedUsuarios)) {
      localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuariosSeed));
    }
  } catch (error) {
    localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuariosSeed));
  }
}

/* =====================================================
   SVG de hoja decorativa reutilizable
   ===================================================== */
const LeafSVG = ({ color1 = '#4CAF50', color2 = '#81C784', color3 = '#388E3C' }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    {/* Hoja grande */}
    <path
      d="M100 20 C60 60, 30 120, 100 180 C170 120, 140 60, 100 20Z"
      fill={color1}
      opacity="0.85"
    />
    {/* Nervadura central */}
    <path
      d="M100 30 Q100 100, 100 170"
      stroke={color3}
      strokeWidth="2"
      fill="none"
      opacity="0.5"
    />
    {/* Nervaduras laterales */}
    <path d="M100 60 Q75 75, 60 90" stroke={color3} strokeWidth="1.5" fill="none" opacity="0.3" />
    <path d="M100 60 Q125 75, 140 90" stroke={color3} strokeWidth="1.5" fill="none" opacity="0.3" />
    <path d="M100 95 Q70 110, 55 130" stroke={color3} strokeWidth="1.5" fill="none" opacity="0.3" />
    <path d="M100 95 Q130 110, 145 130" stroke={color3} strokeWidth="1.5" fill="none" opacity="0.3" />
    <path d="M100 130 Q78 140, 65 155" stroke={color3} strokeWidth="1.5" fill="none" opacity="0.3" />
    <path d="M100 130 Q122 140, 135 155" stroke={color3} strokeWidth="1.5" fill="none" opacity="0.3" />
    {/* Hoja pequeña superpuesta */}
    <path
      d="M80 50 C60 80, 50 130, 90 160 C100 120, 95 70, 80 50Z"
      fill={color2}
      opacity="0.6"
    />
  </svg>
);

/* =====================================================
   Patrón de circuito SVG (líneas tecnológicas de fondo)
   ===================================================== */
const CircuitPattern = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="circuit" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
        {/* Líneas horizontales */}
        <line x1="0" y1="50" x2="120" y2="50" stroke="#388E3C" strokeWidth="1" />
        <line x1="150" y1="50" x2="300" y2="50" stroke="#388E3C" strokeWidth="1" />
        <circle cx="120" cy="50" r="3" fill="#388E3C" />
        <circle cx="150" cy="50" r="3" fill="#388E3C" />

        {/* Líneas verticales */}
        <line x1="200" y1="0" x2="200" y2="80" stroke="#388E3C" strokeWidth="1" />
        <line x1="200" y1="110" x2="200" y2="200" stroke="#388E3C" strokeWidth="1" />
        <circle cx="200" cy="80" r="3" fill="#388E3C" />
        <circle cx="200" cy="110" r="3" fill="#388E3C" />

        {/* Líneas diagonales */}
        <line x1="50" y1="150" x2="100" y2="200" stroke="#388E3C" strokeWidth="1" />
        <circle cx="50" cy="150" r="2.5" fill="#388E3C" />

        <line x1="250" y1="180" x2="300" y2="230" stroke="#388E3C" strokeWidth="1" />
        <circle cx="250" cy="180" r="2.5" fill="#388E3C" />

        {/* Ángulos / esquinas */}
        <polyline points="80,120 80,170 130,170" stroke="#388E3C" strokeWidth="1" fill="none" />
        <circle cx="80" cy="120" r="2.5" fill="#388E3C" />
        <circle cx="130" cy="170" r="2.5" fill="#388E3C" />

        <polyline points="220,250 270,250 270,290" stroke="#388E3C" strokeWidth="1" fill="none" />
        <circle cx="220" cy="250" r="2.5" fill="#388E3C" />
        <circle cx="270" cy="290" r="2.5" fill="#388E3C" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#circuit)" />
  </svg>
);

function LoginPage({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializar usuarios en localStorage si no existen o si el valor es inválido.
  useEffect(() => {
    try {
      const usuariosExistentes = localStorage.getItem(LOCAL_STORAGE_USUARIOS_KEY);
      if (!usuariosExistentes) {
        localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuariosSeed));
      } else {
        JSON.parse(usuariosExistentes);
      }
    } catch (error) {
      localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuariosSeed));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!usuario.trim() || !contrasena.trim()) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let usuariosGuardados = [];
      let usuariosGuardadosRaw = localStorage.getItem(LOCAL_STORAGE_USUARIOS_KEY);

      if (!usuariosGuardadosRaw) {
        localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuariosSeed));
        usuariosGuardadosRaw = localStorage.getItem(LOCAL_STORAGE_USUARIOS_KEY);
      }

      try {
        usuariosGuardados = JSON.parse(usuariosGuardadosRaw || '[]');
        if (!isValidUsuariosData(usuariosGuardados)) {
          localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuariosSeed));
          usuariosGuardados = usuariosSeed;
        }
      } catch (error) {
        localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuariosSeed));
        usuariosGuardados = usuariosSeed;
      }

      const terminoBusqueda = usuario.trim().toLowerCase();

      let usuarioEncontrado = usuariosGuardados.find((u) => {
        const emailMatch = u.email?.toLowerCase() === terminoBusqueda;
        const usernameMatch = u.email?.split('@')[0].toLowerCase() === terminoBusqueda;
        const nombreMatch = u.nombre_completo?.toLowerCase() === terminoBusqueda;
        return emailMatch || usernameMatch || nombreMatch;
      });

      // Fallback: Si no está en localStorage (quizás fue borrado), buscamos en la semilla
      if (!usuarioEncontrado) {
        usuarioEncontrado = usuariosSeed.find((u) => {
          const emailMatch = u.email?.toLowerCase() === terminoBusqueda;
          const usernameMatch = u.email?.split('@')[0].toLowerCase() === terminoBusqueda;
          const nombreMatch = u.nombre_completo?.toLowerCase() === terminoBusqueda;
          return emailMatch || usernameMatch || nombreMatch;
        });

        // Si existe en la semilla pero fue borrado, lo restauramos
        if (usuarioEncontrado) {
          usuariosGuardados.push(usuarioEncontrado);
          localStorage.setItem(LOCAL_STORAGE_USUARIOS_KEY, JSON.stringify(usuariosGuardados));
        }
      }

      if (usuarioEncontrado) {
        if (usuarioEncontrado.password !== contrasena) {
          setError('Contraseña incorrecta. Intente nuevamente.');
          setLoading(false);
          return;
        }

        if (usuarioEncontrado.estado !== 'ACTIVO') {
          setError('La cuenta está inactiva. Contacte al administrador.');
          setLoading(false);
          return;
        }

        localStorage.setItem('eco_current_user', JSON.stringify({
          id: usuarioEncontrado.id,
          nombre_completo: usuarioEncontrado.nombre_completo,
          email: usuarioEncontrado.email,
          rol: usuarioEncontrado.rol,
        }));
        onLogin(true);
      } else {
        setError('Usuario no encontrado. Compruebe su correo o nombre completo.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-wrapper">
      {/* Patrón de circuito de fondo */}
      <div className="login-circuit-pattern">
        <CircuitPattern />
      </div>

      {/* Hojas decorativas */}
      <div className="login-leaf login-leaf--top-right">
        <LeafSVG color1="#4CAF50" color2="#81C784" color3="#2E7D32" />
      </div>
      <div className="login-leaf login-leaf--top-left">
        <LeafSVG color1="#66BB6A" color2="#A5D6A7" color3="#388E3C" />
      </div>
      <div className="login-leaf login-leaf--bottom-left">
        <LeafSVG color1="#4CAF50" color2="#81C784" color3="#1B5E20" />
      </div>
      <div className="login-leaf login-leaf--mid-left">
        <LeafSVG color1="#81C784" color2="#A5D6A7" color3="#388E3C" />
      </div>
      <div className="login-leaf login-leaf--bottom-right">
        <LeafSVG color1="#66BB6A" color2="#A5D6A7" color3="#2E7D32" />
      </div>
      <div className="login-leaf login-leaf--top-center">
        <LeafSVG color1="#4CAF50" color2="#81C784" color3="#388E3C" />
      </div>

      {/* ========== Panel Izquierdo — Branding ========== */}
      <div className="login-left-panel">
        <div className="login-left-content">
          <h1 className="login-system-title">
            Sistema de Gestión de<br />Saneamiento Ambiental
          </h1>

          {/* Logo de Econexus */}
          <div className="login-logo-wrapper">
            <img src={econexusLogo} alt="Econexus Logo" />
          </div>
        </div>
      </div>

      {/* ========== Panel Derecho — Tarjeta Login ========== */}
      <div className="login-right-panel">
        <div className="login-card">
          <h2 className="login-card-title">Acceso para Encargados</h2>

          {/* Error */}
          {error && (
            <div className="login-error-alert">
              <i className="bi bi-exclamation-triangle-fill login-error-icon"></i>
              <span className="login-error-text">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Campo Usuario */}
            <div className="login-field">
              <div className="login-field-wrapper">
                <i className="bi bi-person-fill login-field-icon"></i>
                <input
                  id="login-usuario"
                  type="text"
                  className="login-field-input"
                  placeholder="Usuario / Correo"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="login-field">
              <div className="login-field-wrapper">
                <i className="bi bi-lock-fill login-field-icon"></i>
                <input
                  id="login-contrasena"
                  type={showPassword ? 'text' : 'password'}
                  className="login-field-input"
                  placeholder="Contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                </button>
              </div>
            </div>

            {/* Botón Iniciar Sesión */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
              id="login-submit-btn"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
