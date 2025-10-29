import React, { useState, useEffect } from 'react';
import styles from './DishFormModal.module.css';
import { FiX, FiUpload } from 'react-icons/fi';

function DishFormModal({ isOpen, onClose, dishToEdit }) {
  // Un état pour chaque champ du formulaire
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Pizza');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Ce hook se déclenche chaque fois que 'dishToEdit' change
  useEffect(() => {
    if (dishToEdit) { // Si on est en mode "Modifier"
      setName(dishToEdit.name);
      setDescription(dishToEdit.description || ''); // Valeur par défaut
      setCategory(dishToEdit.category);
      setPrice(dishToEdit.price);
      setImagePreview(dishToEdit.imageUrl);
      setImage(null); // On réinitialise le fichier image
    } else { // Si on est en mode "Ajouter"
      // On réinitialise tous les champs
      setName('');
      setDescription('');
      setCategory('Pizza');
      setPrice('');
      setImage(null);
      setImagePreview('');
    }
  }, [dishToEdit, isOpen]); // Se redéclenche si on ouvre/ferme ou si le plat change

  if (!isOpen) return null; // Si la modale n'est pas ouverte, on ne rend rien

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, description, category, price, image };
    console.log("Données soumises :", formData);
    // Ici, vous enverriez les données à l'API Laravel
    onClose(); // On ferme la modale après soumission
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Crée une URL locale pour l'aperçu
    }
  };

  return (
    // L'overlay qui recouvre toute la page
    <div className={styles.overlay} onClick={onClose}>
      {/* La modale elle-même. stopPropagation empêche la fermeture si on clique à l'intérieur */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* En-tête de la Modale */}
        <div className={styles.header}>
          <h2>{dishToEdit ? 'Modifier le Plat' : 'Ajouter un Nouveau Plat'}</h2>
          <button onClick={onClose} className={styles.closeButton}><FiX /></button>
        </div>

        {/* Le Formulaire */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Uploader d'Image */}
          <div className={styles.imageUploader}>
            <label htmlFor="dish-image-upload">
              {imagePreview ? (
                <img src={imagePreview} alt="Aperçu du plat" className={styles.imagePreview} />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <FiUpload />
                  <span>Cliquer pour charger une image</span>
                </div>
              )}
            </label>
            <input id="dish-image-upload" type="file" onChange={handleImageChange} accept="image/*" />
          </div>

          {/* Autres Champs */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom du plat</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
          </div>
          
          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label htmlFor="category">Catégorie</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Pizza</option>
                <option>Tacos</option>
                <option>Burgers</option>
                <option>Boissons</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="price">Prix (DH)</label>
              <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.5" />
            </div>
          </div>
          
          {/* Pied de page de la Modale */}
          <div className={styles.footer}>
            <button type="button" onClick={onClose} className={`${styles.button} ${styles.cancel}`}>Annuler</button>
            <button type="submit" className={`${styles.button} ${styles.submit}`}>{dishToEdit ? 'Enregistrer les modifications' : 'Ajouter le plat'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DishFormModal;