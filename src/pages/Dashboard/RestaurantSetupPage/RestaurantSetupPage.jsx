import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RestaurantSetupPage.module.css';

import { useDispatch } from 'react-redux';
import { updateUser } from '../../../store/authSlice'

// Importez vos composants d'étapes (assurez-vous que les chemins sont corrects)
import Step1_Info from './Step1_Info';
import Step2_Visuals from './Step2_Visuals';
import Step3_Horaires from './Step3_Horaires';

function RestaurantSetupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: '',
    logo: null,
    logoPreview: '',
    coverImage: null,
    coverPreview: '',
    horaires: { // On initialise la structure pour éviter les erreurs
        Lundi: { ouvert: false },
        Mardi: { ouvert: false },
        Mercredi: { ouvert: false },
        Jeudi: { ouvert: false },
        Vendredi: { ouvert: false },
        Samedi: { ouvert: false },
        Dimanche: { ouvert: false },
    }
  });

  // Fonction pour mettre à jour le formulaire depuis les composants enfants
  const updateFormData = (newData) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  // Fonction finale pour simuler la sauvegarde et rediriger
  const submitFinalData = () => {
    console.log("Données de configuration à 'sauvegarder' :", formData);
    
    // On simule la création d'un utilisateur "connecté" dont la configuration est terminée
    const mockUser = {
      // On peut imaginer récupérer l'email depuis une étape précédente ou un contexte
      email: 'gerant@test.com',
      role: 'manager',
      is_setup_complete: true // La clé du système !
    };

    // On sauvegarde cette information dans le localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    dispatch(updateUser({ 
      is_setup_complete: true 
    })); 
    // On prévient l'utilisateur et on le redirige
    alert("Votre restaurant a été configuré avec succès ! Vous allez être redirigé vers votre tableau de bord.");
    navigate('/dashboard/menu');
  };

  // Logique de navigation entre les étapes
  const handleNext = () => {
    // Si nous ne sommes pas à la dernière étape, on avance
    if (step < 3) {
      setStep(prevStep => prevStep + 1);
    } 
    // Si nous sommes à la dernière étape, ce bouton déclenche la soumission
    else {
      submitFinalData();
    }
  };
  
  const handlePrev = () => {
    // On ne peut pas reculer en dessous de la première étape
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
    }
  };

  // Fonction pour afficher le bon composant d'étape
  const renderStepContent = () => {
    // On passe les données actuelles (data) et la fonction de mise à jour (update) en props
    const props = { data: formData, update: updateFormData };
    
    switch (step) {
      case 1:
        return <Step1_Info {...props} />;
      case 2:
        return <Step2_Visuals {...props} />;
      case 3:
        return <Step3_Horaires {...props} />;
      default:
        return <Step1_Info {...props} />;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.setupContainer}>
        {/* L'indicateur de progression visuel */}
        <div className={styles.stepper}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>1</div> Infos Générales
          </div>
          <div className={styles.stepConnector}></div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>2</div> Visuels
          </div>
          <div className={styles.stepConnector}></div>
          <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>3</div> Horaires
          </div>
        </div>
        
        {/* Le contenu du formulaire (plus besoin de la balise <form>) */}
        <div className={styles.formContent}>
          {renderStepContent()}
          
          {/* La barre de navigation du formulaire */}
          <div className={styles.navigationButtons}>
            {step > 1 && (
              <button type="button" onClick={handlePrev} className={styles.prevButton}>
                Précédent
              </button>
            )}
            
            <div className={styles.spacer}></div>
            
            {/* Le bouton unique qui change de fonction et de texte */}
            <button type="button" onClick={handleNext} className={styles.nextButton}>
              {step < 3 ? 'Suivant' : 'Terminer la configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantSetupPage;