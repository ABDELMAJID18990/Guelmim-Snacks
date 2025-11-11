import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute({ user }) {
  
  
  const location = useLocation();

  // Cas 1 : Personne n'est connecté -> Redirection vers /login
  if (!user || user.role !== 'manager') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  const isSetupComplete = user.is_setup_complete;
  // Cas 2 : Connecté, mais la config N'EST PAS complète ET on essaie d'aller ailleurs que sur la page de setup
  if (!isSetupComplete && location.pathname !== '/dashboard/setup') {
    alert("Vous devez compléter la configuration de votre restaurant.");
    return <Navigate to="/dashboard/setup" replace />;
  }

  // Cas 3 : Connecté ET la config EST complète ET on essaie d'aller sur la page de setup
  if (isSetupComplete && location.pathname === '/dashboard/setup') {
    return <Navigate to="/dashboard/orders" replace />;
  }

  // Cas 4 : Tout est OK, on affiche la page demandée (Commandes, Menu, etc.)
  return <Outlet />; 
}

export default ProtectedRoute;