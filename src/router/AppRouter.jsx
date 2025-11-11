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

import ScrollToTop from '../components/utils/ScrollToTop';

import { mockOrders } from '../data/mockData';

function AppRouter() {

     const [orders, setOrders] = useState(mockOrders);


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
        <>
        <ScrollToTop />
        <Routes>
            {/* ------------------------------------------------------------- */}
            {/* --- I. ROUTES PUBLIQUES (Layout Principal avec Navbar/Footer) --- */}
            {/* ------------------------------------------------------------- */}
            <Route element={
                <MainLayout                   
                />}
            >
                <Route path='/' element={<HomePage />} />
                <Route path='/snacks' element={<SnacksPage />} /> 
                <Route path='/menu' element={<MenuPage/>} />

                {/* Pages de détail recevant la fonction pour ajouter au panier */}
                <Route path='/snack/:snackId' element={<SnackPage  />} />
                <Route path='/plat/:dishId' element={<DishPage  />} /> 

                {/* Page du panier recevant toutes les données et fonctions du panier */}
                <Route path="/cart" element={<CartPage  />} />
                
                <Route path="/devenir-partenaire" element={<BecomePartnerPage />} />
            </Route>
            

            {/* ------------------------------------------------------------------- */}
            {/* --- II. ROUTES D'AUTHENTIFICATION (Layouts FullScreen, reçoivent onLogin) --- */}
            {/* ------------------------------------------------------------------- */}
            {/* Les pages d'authentification sont autonomes et reçoivent onLogin pour la redirection */}
            <Route path="/login" element={<LoginPage  />} />
            <Route path="/register" element={<RegisterPage  />} />
            <Route path="/register-partner" element={<PartnerRegisterPage  />} /> 


            {/* ------------------------------------------------------------- */}
            {/* --- III. ROUTES PROTÉGÉES (Pour les Gérants) --- */}
            {/* ------------------------------------------------------------- */}
            <Route element={<ProtectedRoute  />}>
                
                {/* Route Setup (sans Layout) */}
                <Route path="/dashboard/setup" element={<RestaurantSetupPage />} /> 

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
        </>
        
    );
}

export default AppRouter;