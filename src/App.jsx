import AppRouter from './router/AppRouter';
import React, { useState } from 'react';

import Navbar from './components/layout/Navbar/Navbar';
import HeroSection from './components/sections/HeroSection/HeroSection';
import HomePage from './pages/HomePage/HomePage';
import SnackPage from './pages/SnackPage/SnackPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CartPage from './pages/CartPage/CartPage';
import DashboardOrdersPage from './pages/Dashboard/DashboardOrdersPage/DashboardOrdersPage';
import DashboardMenuPage from './pages/Dashboard/DashboardMenuPage/DashboardMenuPage';
import Footer from './components/layout/Footer/Footer';

const initialCartItems = [
  { id: 2, name: "Tacos Poulet Spécial", price: 35.00, quantity: 2, imageUrl: "..." },
  { id: 5, name: "Pizza 4 Fromages", price: 55.00, quantity: 1, imageUrl: "..." },
];


function App() {
    const [cartItems, setCartItems] = useState(initialCartItems);

  // Fonction pour ajouter un article (à passer à SnackPage)
  const handleAddToCart = (itemToAdd) => {
    console.log("Ajout au panier :", itemToAdd);
  };
  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };
  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

    return <AppRouter />;
}

export default App;