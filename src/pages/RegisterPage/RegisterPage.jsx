import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

// Importations des composants et icônes
import Input from '../../components/ui/Input/Input';
import styles from './RegisterPage.module.css'; 
import { FiUser, FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import illustration from '../../assets/images/login-illustration.jpg'; 
import SimpleHeader from '../../components/layout/SimpleHeader/SimpleHeader';


function RegisterPage({onLogin}) {
  const navigate = useNavigate();

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
    const mockClientUser = {
      name: name,
      email: email,
      role: 'customer' // Rôle très important
    };

    onLogin(mockClientUser);

    alert(`Bienvenue, ${name} ! Votre compte a été créé.`);
    navigate('/');
    // Ici, plus tard, vous appellerez votre API Laravel pour créer un nouvel utilisateur
  };

  return (
    <div className={styles.pageWrapper}> 
      <SimpleHeader />
      <div className={styles.content}>

        <div className={styles.illustrationSide}>
        <img src={illustration} alt="Illustration de commande de nourriture" />
      </div>

      {/* --- Colonne de Droite : Formulaire d'Inscription --- */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>          
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
    </div>
  );
}

export default RegisterPage;