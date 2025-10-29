import React from 'react';
import AppRouter from './router/AppRouter';

import Navbar from './components/layout/Navbar/Navbar';
import HeroSection from './components/sections/HeroSection/HeroSection';
import HomePage from './pages/HomePage/HomePage';
import SnackPage from './pages/SnackPage/SnackPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CartPage from './pages/CartPage/CartPage';
import DashboardOrdersPage from './pages/Dashboard/DashboardOrdersPage/DashboardOrdersPage';
import DashboardMenuPage from './pages/Dashboard/DashboardMenuPage/DashboardMenuPage';

function App() {
 return <AppRouter />;
}

export default App;