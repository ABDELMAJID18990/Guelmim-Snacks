import AppRouter from './router/AppRouter';
import React, { useState, useEffect } from 'react';



const initialCartItems = [
  { id: 2, name: "Tacos Poulet Spécial", price: 35.00, quantity: 2, imageUrl: "..." },
  { id: 5, name: "Pizza 4 Fromages", price: 55.00, quantity: 1, imageUrl: "..." },
];


function App() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

    try {
      // On essaie de lire l'utilisateur depuis le localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du localStorage", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (userData) => {
    const storedUser = localStorage.getItem('user');
    const existingUser = storedUser ? JSON.parse(storedUser) : {};
    
    // 2. On fusionne les données existantes avec les nouvelles (userData)
    const mergedUserData = { ...existingUser, ...userData };
    
    // 3. On sauvegarde le résultat final et on met à jour l'état
    localStorage.setItem('user', JSON.stringify(mergedUserData));
    setUser(mergedUserData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleAddToCart = (itemToAdd, quantity) => {
    const existingItem = cartItems.find(item => item.id === itemToAdd.id);
    
     if (existingItem) {
      // Si l'article existe déjà, on augmente juste sa quantité
      handleUpdateQuantity(itemToAdd.id, existingItem.quantity + quantity);
    } else {
      // Sinon, on ajoute le nouvel article avec sa quantité
      setCartItems([...cartItems, { ...itemToAdd, quantity }]);
    }
    
    // On peut afficher une petite alerte pour le feedback
    alert(`${quantity} x ${itemToAdd.name} a été ajouté au panier !`);

  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
     if (newQuantity < 1) {
      // Si la quantité tombe à 0, on supprime l'article
      handleRemoveFromCart(itemId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };
  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  if (isLoading) {
    return <div>Chargement de la session...</div>; // Ou un composant de spinner
  }

    return <AppRouter
          user={user} 
          onLogin={handleLogin}
          onLogout={handleLogout}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
       />;
}

export default App;