import { Routes, Route } from "react-router-dom";

// Importations des Layouts
import MainLayout from "../components/layout/MainLayout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout/DashboardLayout";

// Importations des Pages
import HomePage from "../pages/HomePage/HomePage";
import SnacksPage from "../pages/SnacksPage/SnacksPage";
import MenuPage from "../pages/MenuPage/MenuPage";
import SnackPage from "../pages/SnackPage/SnackPage";
import DishPage from "../pages/DishPage/DishPage";
import CartPage from "../pages/CartPage/CartPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import PartnerRegisterPage from "../pages/PartnerRegisterPage/PartnerRegisterPage";
import BecomePartnerPage from "../pages/BecomePartnerPage/BecomePartnerPage";
import DashboardOrdersPage from "../pages/Dashboard/DashboardOrdersPage/DashboardOrdersPage";
import DashboardMenuPage from "../pages/Dashboard/DashboardMenuPage/DashboardMenuPage";
import RestaurantSetupPage from "../pages/Dashboard/RestaurantSetupPage/RestaurantSetupPage";
import DashboardAccountPage from "../pages/Dashboard/DashboardAccountPage/DashboardAccountPage";

// Importations des Gardiens et Utilitaires
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "../components/utils/ScrollToTop";

function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ------------------------------------------------------------- */}
        {/* --- I. ROUTES PUBLIQUES (Layout Principal avec Navbar/Footer) --- */}
        {/* ------------------------------------------------------------- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/snacks" element={<SnacksPage />} />
          <Route path="/menu" element={<MenuPage />} />

          <Route path="/snack/:snackId" element={<SnackPage />} />
          <Route path="/plat/:dishId" element={<DishPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/devenir-partenaire" element={<BecomePartnerPage />} />
        </Route>

        {/* ------------------------------------------------------------------- */}
        {/* --- II. ROUTES D'AUTHENTIFICATION --- */}
        {/* ------------------------------------------------------------------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-partner" element={<PartnerRegisterPage />} />

        {/* ------------------------------------------------------------- */}
        {/* --- III. ROUTES PROTÉGÉES (Pour les Gérants) --- */}
        {/* ------------------------------------------------------------- */}

        <Route element={<ProtectedRoute />}>
          {/* Route Setup (sans Sidebar) */}
          <Route path="/dashboard/setup" element={<RestaurantSetupPage />} />

          {/* Layout des pages avec Sidebar */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/orders" element={<DashboardOrdersPage />} />
            <Route path="/dashboard/menu" element={<DashboardMenuPage />} />
            <Route
              path="/dashboard/account"
              element={<DashboardAccountPage />}
            />
          </Route>
        </Route>

        {/* ------------------------------------------------------------- */}
        {/* --- IV. ROUTE 404 --- */}
        {/* ------------------------------------------------------------- */}
        <Route path="*" element={<h1>Page non trouvée (404)</h1>} />
      </Routes>
    </>
  );
}

export default AppRouter;
