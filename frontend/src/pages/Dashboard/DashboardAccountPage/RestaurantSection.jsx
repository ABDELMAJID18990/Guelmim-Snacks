import styles from "./DashboardAccountPage.module.css";
import { FiUpload } from "react-icons/fi";

function RestaurantSection({ restaurantData, setRestaurantData }) {
  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      setRestaurantData({
        ...restaurantData,
        logoFile: e.target.files[0],
        logoUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <div>
      <h2>Informations du Restaurant</h2>
      <div className={styles.formGroup}>
        <label htmlFor="restaurantName">Nom du Restaurant</label>
        <input
          id="restaurantName"
          type="text"
          value={restaurantData.name}
          onChange={(e) =>
            setRestaurantData({ ...restaurantData, name: e.target.value })
          }
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="5"
          value={restaurantData.description}
          onChange={(e) =>
            setRestaurantData({
              ...restaurantData,
              description: e.target.value,
            })
          }
        />
      </div>

      <hr className={styles.separator} />

      <h3>Visuels</h3>
      <div className={styles.uploadGrid}>
        <div className={styles.formGroup}>
          <label>Logo actuel : {restaurantData.logoUrl}</label>
          <label htmlFor="logo-upload" className={styles.uploadButton}>
            <FiUpload /> Changer le Logo
          </label>
          <input
            id="logo-upload"
            type="file"
            onChange={(e) => handleFileChange(e, "logoUrl")}
          />
        </div>
      </div>
    </div>
  );
}

export default RestaurantSection;
