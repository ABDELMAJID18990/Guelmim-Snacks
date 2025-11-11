import React from 'react';
import styles from './DashboardMenuPage.module.css';
import { useState } from 'react';
import DishFormModal from '../../../components/specific/DishFormModal/DishFormModal';
import { mockDishes } from '../../../data/mockData';
import { mockMenu } from '../../../data/mockData';


import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import ToggleSwitch from '../../../components/ui/ToggleSwitch/ToggleSwitch'; // On va créer ce composant !



function DashboardMenuPage() {
  const [menuItems, setMenuItems] = useState(mockDishes);
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
   const handleSaveDish = (dishData) => {
    if (dishData.id) {
      // MODE MODIFICATION : On met à jour l'élément existant
      setMenuItems(prev => prev.map(dish => 
        dish.id === dishData.id ? { ...dish, ...dishData } : dish
      ));
      alert(`Plat "${dishData.name}" mis à jour.`);
    } else {
      // MODE CRÉATION : On ajoute un nouvel élément (simule un nouvel ID)
      const newDish = { ...dishData, id: Date.now(), is_available: true };
      setMenuItems(prev => [newDish, ...prev]);
      alert(`Plat "${newDish.name}" ajouté au menu.`);
    }
    handleCloseModal();
  };

  // FONCTION 2 : SUPPRIMER
  const handleDeleteDish = (dishId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) {
      setMenuItems(prev => prev.filter(dish => dish.id !== dishId));
      alert("Plat supprimé.");
    }
  };

  // FONCTION 3 : DISPONIBILITÉ (Toggle)
  const handleToggleAvailability = (dishId, newStatus) => {
    setMenuItems(prev => prev.map(dish => 
      dish.id === dishId ? { ...dish, is_available: newStatus } : dish
    ));
  };
  
  return (
    <>
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
              {menuItems.map(dish => (
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
                    <ToggleSwitch checked={dish.is_available}
                    onChange={(e) => handleToggleAvailability(dish.id, e.target.checked)} />
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actionButton} ${styles.edit}`} onClick={() => handleOpenEditModal(dish)}><FiEdit /></button>
                      <button className={`${styles.actionButton} ${styles.delete}`} onClick={() => handleDeleteDish(dish.id)}><FiTrash2 /></button>
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
        onSave={handleSaveDish}
      />
    </>
  );
}

export default DashboardMenuPage;