// src/components/dashboard/DashboardStateManager.jsx

import React, { useState } from 'react';
import { mockOrders } from '../../data/mockData'; // Nous devrons ajouter mockOrders à votre fichier de données

// Ce composant enveloppera les pages du Dashboard pour leur fournir les commandes
function DashboardStateManager({ children }) {
  const [orders, setOrders] = useState(mockOrders);

  // Logique pour mettre à jour le statut d'une commande
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => prevOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Les fonctions spécifiques à connecter aux boutons (facile à lire)
  const handleAcceptOrder = (orderId) => updateOrderStatus(orderId, 'preparing');
  const handleReadyOrder = (orderId) => updateOrderStatus(orderId, 'ready');
  const handleCollectOrder = (orderId) => updateOrderStatus(orderId, 'collected');

  const dashboardProps = {
    orders,
    handleAcceptOrder,
    handleReadyOrder,
    handleCollectOrder,
  };

  return <div style={{display:'none'}}>État Gestionnaire</div>;
}

export default DashboardStateManager;