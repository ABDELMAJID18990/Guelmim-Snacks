        import React from 'react';
        import { Routes, Route } from 'react-router-dom';

        // --- Importation de toutes vos pages ---
        import HomePage from '../pages/HomePage/HomePage';
        import SnackPage from '../pages/SnackPage/SnackPage';
        import CartPage from '../pages/CartPage/CartPage';
        import LoginPage from '../pages/LoginPage/LoginPage';
        import RegisterPage from '../pages/RegisterPage/RegisterPage';
        import DashboardOrdersPage from '../pages/Dashboard/DashboardOrdersPage/DashboardOrdersPage';
        import DashboardMenuPage from '../pages/Dashboard/DashboardMenuPage/DashboardMenuPage';

function AppRouter(){
    return(
        <Routes>
            {/* --- Routes Publiques (pour les clients) --- */}
            <Route path='/' element={<HomePage/>}/>

            {/* Le ":snackId" est un paramètre dynamique. 
              On pourra récupérer sa valeur dans la page SnackPage */}
            <Route path='/snack/:snackId' element={<SnackPage/>}/>
            
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* --- Routes Privées (pour le gérant de snack) --- */}
            {/* Idéalement, ces routes seraient protégées */}
            <Route path="/dashboard/orders" element={<DashboardOrdersPage />} />
            <Route path="/dashboard/menu" element={<DashboardMenuPage />} />
            
            {/* (Optionnel) Une route "catch-all" pour les pages non trouvées */}
            <Route path="*" element={<h1>Page non trouvée (404)</h1>} />


        </Routes>
    )
}

export default AppRouter;
