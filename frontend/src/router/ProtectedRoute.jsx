import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Ce composant vérifie l'état de l'utilisateur dans le localStorage

function ProtectedRoute() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Sécurité de base : Est-ce qu'il est connecté et est-ce un manager ?
  if (!user || user.role !== "manager") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isSetupComplete = Boolean(user.is_setup_complete);

  // Cas 2 : Connecté, mais la config N'EST PAS complète ET on essaie d'aller ailleurs que sur la page de setup
  if (!isSetupComplete && location.pathname !== "/dashboard/setup") {
    return <Navigate to="/dashboard/setup" replace />;
  }

  // Cas 3 : Connecté ET la config EST complète ET on essaie d'aller sur la page de setup
  if (isSetupComplete && location.pathname === "/dashboard/setup") {
    return <Navigate to="/dashboard/orders" replace />;
  }

  // Cas 4 : Tout est bon, on affiche la route demandée
  return <Outlet />;
}

export default ProtectedRoute;
