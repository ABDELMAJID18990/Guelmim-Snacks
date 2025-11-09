import React, { useState }  from 'react';
import { Routes, Route } from 'react-router-dom';

// Importations des Layouts
import MainLayout from '../components/layout/MainLayout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';

// Importations des Pages
import HomePage from '../pages/HomePage/HomePage';
import SnacksPage from '../pages/SnacksPage/SnacksPage';
import MenuPage from '../pages/MenuPage/MenuPage';
import SnackPage from '../pages/SnackPage/SnackPage';
import DishPage from '../pages/DishPage/DishPage';
import CartPage from '../pages/CartPage/CartPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import PartnerRegisterPage from '../pages/PartnerRegisterPage/PartnerRegisterPage';
import BecomePartnerPage from '../pages/BecomePartnerPage/BecomePartnerPage';
import DashboardOrdersPage from '../pages/Dashboard/DashboardOrdersPage/DashboardOrdersPage';
import DashboardMenuPage from '../pages/Dashboard/DashboardMenuPage/DashboardMenuPage';
import RestaurantSetupPage from '../pages/Dashboard/RestaurantSetupPage/RestaurantSetupPage';

// Importations des Gardiens et Gestionnaires d'État
import ProtectedRoute from './ProtectedRoute';
import DashboardStateManager from '../components/dashboard/DashboardStateManager'; // Assurez-vous que le chemin est correct

import { mockOrders } from '../data/mockData';
// La fonction reçoit TOUTES les props du "cerveau" (App.jsx)
function AppRouter({ 
    user, onLogin, onLogout, 
    cartItems, onAddToCart, onUpdateQuantity, onRemoveFromCart 
}) {

     const [orders, setOrders] = useState(mockOrders);
    // On crée des objets props pour les passer plus facilement
    const authProps = { onLogin, onLogout };
    const cartProps = { cartItems, onAddToCart, onUpdateQuantity, onRemoveFromCart };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prevOrders => prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };
    const handleAcceptOrder = (orderId) => updateOrderStatus(orderId, 'preparing');
    const handleReadyOrder = (orderId) => updateOrderStatus(orderId, 'ready');
    const handleCollectOrder = (orderId) => updateOrderStatus(orderId, 'collected');

    const handleDeclineOrder = (orderId) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        alert(`Commande ${orderId} refusée et retirée de la liste.`);
    };

    // On prépare les props
    const orderHandlers = { handleAcceptOrder, handleReadyOrder, handleCollectOrder, handleDeclineOrder };

    return (
        <Routes>
            {/* ------------------------------------------------------------- */}
            {/* --- I. ROUTES PUBLIQUES (Layout Principal avec Navbar/Footer) --- */}
            {/* ------------------------------------------------------------- */}
            <Route element={
                <MainLayout 
                    user={user} 
                    onLogout={onLogout} 
                    cartItems={cartItems} 
                    onAddToCart={onAddToCart}
                />}
            >
                <Route path='/' element={<HomePage />} />
                <Route path='/snacks' element={<SnacksPage />} /> 
                <Route path='/menu' element={<MenuPage onAddToCart={onAddToCart} />} />

                {/* Pages de détail recevant la fonction pour ajouter au panier */}
                <Route path='/snack/:snackId' element={<SnackPage onAddToCart={onAddToCart} />} />
                <Route path='/plat/:dishId' element={<DishPage onAddToCart={onAddToCart} />} /> 

                {/* Page du panier recevant toutes les données et fonctions du panier */}
                <Route path="/cart" element={<CartPage {...cartProps} />} />
                
                <Route path="/devenir-partenaire" element={<BecomePartnerPage />} />
            </Route>
            

            {/* ------------------------------------------------------------------- */}
            {/* --- II. ROUTES D'AUTHENTIFICATION (Layouts FullScreen, reçoivent onLogin) --- */}
            {/* ------------------------------------------------------------------- */}
            {/* Les pages d'authentification sont autonomes et reçoivent onLogin pour la redirection */}
            <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
            <Route path="/register" element={<RegisterPage onLogin={onLogin} />} />
            <Route path="/register-partner" element={<PartnerRegisterPage onLogin={onLogin} />} /> 


            {/* ------------------------------------------------------------- */}
            {/* --- III. ROUTES PROTÉGÉES (Pour les Gérants) --- */}
            {/* ------------------------------------------------------------- */}
            <Route element={<ProtectedRoute user={user} />}>
                
                {/* Route Setup (sans Layout) */}
                <Route path="/dashboard/setup" element={<RestaurantSetupPage onLogin={onLogin} />} /> 

                {/* Layout des pages avec Sidebar */}
                <Route element={<DashboardLayout />}>

                    {/* Route Commandes : reçoit les commandes et les fonctions */}
                    <Route 
                        path="/dashboard/orders" 
                        element={
                            <DashboardOrdersPage 
                                orders={orders}
                                {...orderHandlers}
                            />
                        } 
                    />

                    {/* Route Menu : n'a pas besoin des commandes */}
                    <Route path="/dashboard/menu" element={<DashboardMenuPage />} />
                </Route>

            </Route>

            {/* ------------------------------------------------------------- */}
            {/* --- IV. ROUTE 404 --- */}
            {/* ------------------------------------------------------------- */}
            <Route path="*" element={<h1>Page non trouvée (404)</h1>} />

        </Routes>
    );
}

export default AppRouter;