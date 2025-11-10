import React from 'react';
import styles from './TestimonialsSection.module.css';
import { FiStar } from 'react-icons/fi';

// --- Données Factices pour les Avis ---
const mockTestimonials = [
  {
    id: 1,
    author: 'Ayoub El',
    rating: 5,
    comment: "La meilleure pizza que j'ai mangée à Guelmim ! La commande était prête exactement à l'heure. Service impeccable.",
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    author: 'Fatima Z.',
    rating: 4,
    comment: "Les tacos sont incroyablement généreux et délicieux. L'application est super simple à utiliser. Je recommande vivement !",
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    author: 'Youssef K.',
    rating: 5,
    comment: "Enfin une solution pour éviter la file d'attente du midi ! Rapide, efficace, et le burger était parfait. Bravo.",
    avatarUrl: 'https://randomuser.me/api/portraits/men/46.jpg'
  }
];

// Fonction pour afficher les étoiles
const renderStars = (rating) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FiStar key={i} className={i < rating ? styles.starFilled : styles.starEmpty} />
    );
  }
  return stars;
};


function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Ce que nos clients en disent</h2>
      <div className={styles.grid}>
        {mockTestimonials.map(testimonial => (
          <div key={testimonial.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <img src={testimonial.avatarUrl} alt={testimonial.author} className={styles.avatar} />
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{testimonial.author}</span>
                <div className={styles.rating}>{renderStars(testimonial.rating)}</div>
              </div>
            </div>
            <p className={styles.comment}>"{testimonial.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;