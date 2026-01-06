import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUserPassword } from "../../../store/authSlice";
import styles from "./PasswordModal.module.css";
import toast from "react-hot-toast";
import { FiX, FiLock } from "react-icons/fi";

function PasswordModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.new_password_confirmation) {
      toast.error("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);

    try {
      await dispatch(changeUserPassword(formData)).unwrap();
      toast.success("Mot de passe modifié avec succès !");
      onClose();
      setFormData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (error) {
      toast.error(error || "Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Changer le mot de passe</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Mot de passe actuel</label>
            <div className={styles.inputIcon}>
              <FiLock className={styles.icon} />
              <input
                type="password"
                placeholder="Votre mot de passe actuel"
                value={formData.current_password}
                onChange={(e) =>
                  setFormData({ ...formData, current_password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <hr className={styles.separator} />
          <div className={styles.inputGroup}>
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              placeholder="6 caractères minimum"
              value={formData.new_password}
              onChange={(e) =>
                setFormData({ ...formData, new_password: e.target.value })
              }
              required
              minLength={6}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Confirmer le nouveau</label>
            <input
              type="password"
              placeholder="Répétez le mot de passe"
              value={formData.new_password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  new_password_confirmation: e.target.value,
                })
              }
              required
            />
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Annuler
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Modification..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;
