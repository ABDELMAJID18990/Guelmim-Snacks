import React from 'react';
import styles from './DashboardMenuPage.module.css';
import { useState } from 'react';
import DishFormModal from '../../../components/specific/DishFormModal/DishFormModal';


// Importations
import DashboardSidebar from '../../../components/layout/DashboardSidebar/DashboardSidebar';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import ToggleSwitch from '../../../components/ui/ToggleSwitch/ToggleSwitch'; // On va créer ce composant !

// Données Factices pour le Menu
const mockMenu = [
  { id: 1, name: 'Pizza Regina', imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65', category: 'Pizza', price: 50.00, is_available: true },
  { id: 2, name: 'Tacos Poulet Gratiné', imageUrl: 'https://images.unsplash.com/photo-1562086181-4494c643194a', category: 'Tacos', price: 35.00, is_available: true },
  { id: 3, name: 'Burger \'Sahara\'', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', category: 'Burgers', price: 45.00, is_available: false },
];


function DashboardMenuPage() {
   const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null); // null = mode ajout, objet = mode modification

  const handleOpenAddModal = () => {
    setEditingDish(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (dish) => {
    setEditingDish(dish);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className={styles.page}>
      <DashboardSidebar />
      <main className={styles.mainContent}>
        {/* --- En-tête de la Page --- */}
        <div className={styles.pageHeader}>
          <h1>Gestion du Menu</h1>
          <button className={styles.addButton} onClick={handleOpenAddModal} >
            <FiPlus /> Ajouter un Plat
          </button>
        </div>

        {/* --- Tableau des Plats --- */}
        <div className={styles.tableContainer}>
          <table className={styles.menuTable}>
            <thead>
              <tr>
                <th>Plat</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Disponibilité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockMenu.map(dish => (
                <tr key={dish.id}>
                  <td>
                    <div className={styles.dishInfo}>
                      <img src={dish.imageUrl} alt={dish.name} className={styles.dishImage} />
                      <span>{dish.name}</span>
                    </div>
                  </td>
                  <td>{dish.category}</td>
                  <td>{dish.price.toFixed(2)} DH</td>
                  <td>
                    <ToggleSwitch checked={dish.is_available} />
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actionButton} ${styles.edit}`} onClick={() => handleOpenEditModal(dish)}><FiEdit /></button>
                      <button className={`${styles.actionButton} ${styles.delete}`}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {/* On rend la modale ici. Elle ne s'affichera que si isModalOpen est true */}
      <DishFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dishToEdit={editingDish}
      />
    </div>
  );
}

export default DashboardMenuPage;