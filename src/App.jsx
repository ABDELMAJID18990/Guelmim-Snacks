import AppRouter from './router/AppRouter';
import React, { useState, useEffect } from 'react';



const initialCartItems = [
  { id: 2, name: "Tacos Poulet Spécial", price: 35.00, quantity: 2, imageUrl: "..." },
  { id: 5, name: "Pizza 4 Fromages", price: 55.00, quantity: 1, imageUrl: "..." },
];


function App() {
    const [user, setUser] = useState(null);


    useEffect(() => {
    // On vérifie si un utilisateur est déjà "connecté" dans le localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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

  

 

    return <AppRouter
          user={user} 
          onLogin={handleLogin}
          onLogout={handleLogout}
       />;
}

export default App;