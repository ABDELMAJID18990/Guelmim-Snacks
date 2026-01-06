import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DashboardMenuPage.module.css";
import DishFormModal from "../../../components/specific/DishFormModal/DishFormModal";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import ToggleSwitch from "../../../components/ui/ToggleSwitch/ToggleSwitch";

import {
  fetchMyRestaurant,
  addDish,
  updateDish,
  deleteDish,
} from "../../../store/productsSlice";

function DashboardMenuPage() {
  const dispatch = useDispatch();

  const { myRestaurant, status } = useSelector((state) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null); // null = mode ajout, objet = mode modification

  useEffect(() => {
    dispatch(fetchMyRestaurant());
  }, [dispatch]);

  const menuItems = myRestaurant?.dishes || [];

  if (status === "loading" && !myRestaurant)
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        Chargement de votre menu...
      </p>
    );

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

  const handleSaveDish = async (dishData) => {
    try {

      if (dishData.id && typeof dishData.id === "number") {
        // MODE MODIFICATION

        await dispatch(updateDish(dishData)).unwrap();
        alert(`Plat "${dishData.name}" modifié avec succès !`);
      } else {
        // MODE CRÉATION

        const { id, ...newDishData } = dishData;

        await dispatch(addDish(newDishData)).unwrap();
        alert(`Plat "${dishData.name}" ajouté avec succès !`);
      }

      dispatch(fetchMyRestaurant());
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      alert("Erreur: " + error);
    }
  };

  const handleDeleteDish = async (dishId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) {
      try {
        await dispatch(deleteDish(dishId)).unwrap();

        dispatch(fetchMyRestaurant());
      } catch (error) {
        alert("Impossible de supprimer le plat : " + error);
      }
    }
  };

  // FONCTION 3 : DISPONIBILITÉ (Toggle)
  const handleToggleAvailability = async (dishId, newStatus) => {

    try {
      await dispatch(
        updateDish({ id: dishId, is_available: newStatus })
      ).unwrap();
      dispatch(fetchMyRestaurant());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className={styles.mainContent}>
        {/* --- En-tête de la Page --- */}
        <div className={styles.pageHeader}>
          <h1>Gestion du Menu</h1>
          <button className={styles.addButton} onClick={handleOpenAddModal}>
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
              {menuItems.length > 0 ? (
                menuItems.map((dish) => (
                  <tr key={dish.id}>
                    <td>
                      <div className={styles.dishInfo}>
                        <img
                          src={dish.image_url || "https://placehold.co/50"}
                          alt={dish.name}
                          className={styles.dishImage}
                        />
                        <span>{dish.name}</span>
                      </div>
                    </td>
                    <td>{dish.category}</td>
                    <td>{parseFloat(dish.price).toFixed(2)} DH</td>
                    <td>
                      <ToggleSwitch
                        checked={Boolean(dish.is_available)}
                        onChange={(e) =>
                          handleToggleAvailability(dish.id, e.target.checked)
                        }
                      />
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={`${styles.actionButton} ${styles.edit}`}
                          onClick={() => handleOpenEditModal(dish)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.delete}`}
                          onClick={() => handleDeleteDish(dish.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    Votre menu est vide. Ajoutez votre premier plat !
                  </td>
                </tr>
              )}
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
