        import React from 'react';
        import { Routes, Route } from 'react-router-dom';

        import MainLayout from '../components/layout/MainLayout/MainLayout';
        // --- Importation de toutes vos pages ---
        import HomePage from '../pages/HomePage/HomePage';
        import SnackPage from '../pages/SnackPage/SnackPage';
        import CartPage from '../pages/CartPage/CartPage';
        import LoginPage from '../pages/LoginPage/LoginPage';
        import RegisterPage from '../pages/RegisterPage/RegisterPage';
        import DashboardOrdersPage from '../pages/Dashboard/DashboardOrdersPage/DashboardOrdersPage';
        import DashboardMenuPage from '../pages/Dashboard/DashboardMenuPage/DashboardMenuPage';
        import DishPage from '../pages/DishPage/DishPage';
        import SnacksPage from '../pages/SnacksPage/SnacksPage'; // <-- 1. IMPORTEZ la nouvelle page
        import MenuPage from '../pages/MenuPage/MenuPage';

function AppRouter({ cartItems, onAddToCart, onQuantityChange, onRemoveItem }){
    return(
        <Routes>
            <Route element={<MainLayout onAddToCart={onAddToCart}/>}>
            
                <Route path='/' element={<HomePage/>}/>
                <Route path='/snacks' element={<SnacksPage />} /> 
                <Route path='/menu' element={<MenuPage />} />
                <Route path='/snack/:snackId' element={<SnackPage onAddToCart={onAddToCart}/>}/>
                <Route path='/plat/:dishId' element={<DishPage />} /> 
                <Route path="/cart" element={
                    <CartPage 
                        cartItems={cartItems} 
                        onQuantityChange={onQuantityChange} 
                        onRemoveItem={onRemoveItem}
                    />} />
            </Route>
            

            
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
               
            

            {/* --- Routes Privées (pour le gérant de snack) --- */}
            
            <Route path="/dashboard/orders" element={<DashboardOrdersPage />} />
            <Route path="/dashboard/menu" element={<DashboardMenuPage />} />
            
            <Route path="*" element={<h1>Page non trouvée (404)</h1>} />


        </Routes>
    )
}

export default AppRouter;
