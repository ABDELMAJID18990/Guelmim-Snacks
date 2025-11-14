import React from 'react';
import { FiSearch, FiCreditCard, FiShoppingBag } from 'react-icons/fi';
import styles from './HowItWorksSection.module.css';

// On peut définir les données des étapes ici pour garder le JSX propre
const steps = [
  {
    icon: <FiSearch />,
    title: "Choisissez votre repas",
    description: "Parcourez les menus de vos snacks préférés et trouvez ce qui vous fait envie."
  },
  {
    icon: <FiCreditCard />,
    title: "Passez votre commande",
    description: "Validez votre commande en quelques clics. Le snack la reçoit instantanément."
  },
  {
    icon: <FiShoppingBag />,
    title: "Récupérez sans attente",
    description: "Suivez la préparation et venez chercher votre commande chaude dès qu'elle est prête. Fini la queue !"
  }
];

function HowItWorksSection() {
  return (
    <section className={styles.section} >
      <h2 className={styles.title}>Commander n'a jamais été aussi simple</h2>
      <div className={styles.stepsGrid}>
        {steps.map((step, index) => (
          <div key={index} className={styles.stepCard}>
            <div className={styles.iconWrapper}>
              {step.icon}
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorksSection;