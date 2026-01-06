import React from 'react';
import { FiClock, FiStar, FiMapPin } from 'react-icons/fi';
import styles from './SnackCard.module.css';
import placeholderImage from '../../../assets/images/snack-image-placeholder.png'; // Image de snack (SVG)
import { Link } from 'react-router-dom';

function SnackCard({ snack = {} }) {
  const {
    name = "Nom du Snack",
    category = "Pizza & Tacos",
    rating = 4.5,
    priceRange = "25 - 60 DH",
    address = "Centre Ville, Guelmim",
    imageUrl = placeholderImage
  } = snack;

  return (
    <Link to={`/snack/${snack.id}`}  className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.cardCategory}>{category}</p>
        <div className={styles.infoRow}>
          <FiStar className={styles.icon} />
          <span>{rating}</span>
          <span className={styles.separator}>•</span>
          <FiMapPin className={styles.icon} />
          <span>{address}</span>
        </div>
        <div className={styles.priceRange}>
          {priceRange}
        </div>
      </div>
    </Link>
  );
}
export default SnackCard;