
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importations
import Input from '../../components/ui/Input/Input';
import styles from './PartnerRegisterPage.module.css'; 
import { FiHome, FiMapPin, FiUser, FiMail, FiLock } from 'react-icons/fi';
import illustration from '../../assets/images/login-illustration.jpg';
import SimpleHeader from '../../components/layout/SimpleHeader/SimpleHeader'; 

function PartnerRegisterPage({onLogin}) {
  const navigate = useNavigate();

  const [nomRestaurant, setNomRestaurant] = useState('');
  const [adresseRestaurant, setAdresseRestaurant] = useState('');
  const [nomGerant, setNomGerant] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const mockManagerUser = {
      name: nomGerant, // Supposons que vous avez un état 'nomGerant'
      email: email,
      role: 'manager',
      is_setup_complete: false // C'est la clé qui déclenchera la redirection vers le setup !
    };

    onLogin(mockManagerUser);
    alert("Votre compte partenaire a été créé ! Vous allez maintenant configurer votre restaurant.");
    
    // On redirige vers une page du dashboard. Le ProtectedRoute fera le reste !
    navigate('/dashboard/orders'); 
    
  };

  return (
    // On réutilise le même layout en deux colonnes que la page de connexion
    <div className={styles.pageWrapper}>
        <SimpleHeader />
    <div className={styles.content}>
      <div className={styles.illustrationSide}>
        <img src={illustration} alt="Illustration de commande de nourriture" />
      </div>

      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          <h1>Devenez notre prochain partenaire à succès</h1>
          <p className={styles.subtitle}>Remplissez ce formulaire pour commencer à recevoir des commandes.</p>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input icon={<FiHome />} type="text" placeholder="Nom de votre restaurant" value={nomRestaurant} onChange={(e) => setNomRestaurant(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <Input icon={<FiMapPin />} type="text" placeholder="Adresse de votre restaurant" value={adresseRestaurant} onChange={(e) => setAdresseRestaurant(e.target.value)} required />
            </div>

            <hr className={styles.separator} />

            <div className={styles.formGroup}>
              <Input icon={<FiUser />} type="text" placeholder="Votre nom complet (gérant)" value={nomGerant} onChange={(e) => setNomGerant(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <Input icon={<FiMail />} type="email" placeholder="Votre adresse e-mail de contact" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <Input icon={<FiLock />} type="password" placeholder="Créez un mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            
            <button type="submit" className={styles.registerButton}>
              Finaliser l'inscription
            </button>
          </form>

          <div className={styles.loginLink}>
            <p>Vous avez déjà un compte partenaire ? <Link to="/login">Se connecter</Link></p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PartnerRegisterPage;