import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Importations des composants et icônes
import Input from '../../components/ui/Input/Input';
import styles from './RegisterPage.module.css'; // On utilise un nouveau fichier CSS, mais il sera presque identique
import { FiUser, FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import illustration from '../../assets/images/login-illustration.jpg'; // On réutilise la même belle illustration !
import logo from '../../assets/logos/guelmim-snacks-logo.png'; // Adaptez le chemin vers votre logo

function RegisterPage() {
  // On ajoute les états pour les nouveaux champs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log("Registration attempt:", { name, email, password });
    // Ici, plus tard, vous appellerez votre API Laravel pour créer un nouvel utilisateur
  };

  return (
    <div className={styles.page}>
      {/* --- Colonne de Gauche : Illustration (On garde la même) --- */}
      <div className={styles.illustrationSide}>
        <img src={illustration} alt="Illustration de commande de nourriture" />
      </div>

      {/* --- Colonne de Droite : Formulaire d'Inscription --- */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          <a href="/" className={styles.backToHome}>
             <img src={logo} alt="Logo" className={styles.logo} /> 
          </a>
          
          <h1>Créer un compte</h1>
          <p className={styles.subtitle}>Rejoignez-nous et commandez en quelques clics !</p>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input 
                icon={<FiUser />}
                type="text" 
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <Input 
                icon={<FiMail />}
                type="email" 
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <Input 
                icon={<FiLock />}
                type="password" 
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <Input 
                icon={<FiLock />}
                type="password" 
                placeholder="Confirmez le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className={styles.registerButton}>
              S'inscrire
            </button>
          </form>
          
          <div className={styles.loginLink}>
            <p>Vous avez déjà un compte ? <Link to="/login">Se connecter</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;