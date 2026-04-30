import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const currentUserStr = localStorage.getItem('eco_current_user');
  
  if (!currentUserStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const currentUser = JSON.parse(currentUserStr);
    
    // Si no tiene uno de los roles permitidos, redirigir
    if (allowedRoles && !allowedRoles.includes(currentUser.rol)) {
      return <Navigate to="/dashboard" replace />;
    }
  } catch (error) {
    console.error("Error parsing current user", error);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
