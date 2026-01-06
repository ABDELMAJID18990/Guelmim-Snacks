import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./RestaurantSetupPage.module.css";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../../store/authSlice";
import { completeSetup } from "../../../store/productsSlice";

import Step1_Info from "./Step1_Info";
import Step2_Visuals from "./Step2_Visuals";
import Step3_Horaires from "./Step3_Horaires";

function RestaurantSetupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const { status } = useSelector((state) => state.products);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: "",
    logo: null,
    logoPreview: "",
    coverImage: null,
    coverPreview: "",
    horaires: {
      Lundi: { ouvert: false },
      Mardi: { ouvert: false },
      Mercredi: { ouvert: false },
      Jeudi: { ouvert: false },
      Vendredi: { ouvert: false },
      Samedi: { ouvert: false },
      Dimanche: { ouvert: false },
    },
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!formData.description || formData.description.length < 10) {
        newErrors.description =
          "La description doit contenir au moins 10 caractères.";
        isValid = false;
      }
    }

    if (currentStep === 2) {
      if (!formData.logo) {
        toast.error("Le logo est obligatoire pour votre identité visuelle."); // Feedback global
        isValid = false;
      }
      // La cover est optionnelle, pas d'erreur
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitFinalData = async () => {
    const dataToSend = new FormData();
    dataToSend.append("description", formData.description);

    if (formData.logo instanceof File) {
      dataToSend.append("logo", formData.logo);
    }
    if (formData.coverImage instanceof File) {
      dataToSend.append("cover_image", formData.coverImage);
    }

    dataToSend.append("horaires", JSON.stringify(formData.horaires));

    const loadingToast = toast.loading("Configuration de votre restaurant...");

    try {
      await dispatch(completeSetup(dataToSend)).unwrap();
      dispatch(
        updateUser({
          is_setup_complete: true,
        })
      );

      // Succès
      toast.dismiss(loadingToast); // On enlève le chargement
      toast.success("Restaurant configuré avec succès ! 🎉");

      setTimeout(() => {
        navigate("/dashboard/menu");
      }, 1500);
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Erreur setup:", error);
      toast.error("Erreur : " + (error || "Une erreur est survenue."));
    }
  };

  const handleNext = () => {
    // On valide avant d'avancer !
    if (validateStep(step)) {
      if (step < 3) {
        setStep((prev) => prev + 1);
        setErrors({});
      } else {
        submitFinalData();
      }
    } else {
      toast.error("Veuillez corriger les erreurs avant de continuer.");
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  // Fonction pour afficher le bon composant d'étape
  const renderStepContent = () => {
    const props = { data: formData, update: updateFormData, errors: errors };

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
          <div className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
            <div className={styles.stepNumber}>1</div> Infos Générales
          </div>
          <div className={styles.stepConnector}></div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>
            <div className={styles.stepNumber}>2</div> Visuels
          </div>
          <div className={styles.stepConnector}></div>
          <div className={`${styles.step} ${step >= 3 ? styles.active : ""}`}>
            <div className={styles.stepNumber}>3</div> Horaires
          </div>
        </div>

        {/* Le contenu du formulaire  */}
        <div className={styles.formContent}>
          {renderStepContent()}

          {/* La barre de navigation du formulaire */}
          <div className={styles.navigationButtons}>
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className={styles.prevButton}
              >
                Précédent
              </button>
            )}

            <div className={styles.spacer}></div>

            {/* Le bouton unique qui change de fonction et de texte */}
            <button
              type="button"
              onClick={handleNext}
              className={styles.nextButton}
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Sauvegarde..."
                : step < 3
                ? "Suivant"
                : "Terminer la configuration"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantSetupPage;
