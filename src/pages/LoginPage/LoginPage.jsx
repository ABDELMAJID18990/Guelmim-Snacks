import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import SimpleHeader from '../../components/layout/SimpleHeader/SimpleHeader'; 
import Input from '../../components/ui/Input/Input';
import styles from './LoginPage.module.css';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import illustration from '../../assets/images/login-illustration.jpg'; 



function LoginPage({onLogin}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleClientLogin = (event) => {
    event.preventDefault();
    // Crée un utilisateur client
    const mockClientUser = { email: email, role: 'customer' }; 
    onLogin(mockClientUser);
    alert(`Bienvenue, ${email} !`);
    navigate('/'); // Redirige vers la page d'accueil
};

// Nouvelle fonction : Le gérant n'utilise pas le même formulaire que le client
const handleManagerLogin = (event) => {
    event.preventDefault();
    // Simule la vérification et crée un utilisateur gérant
    const mockManagerUser = { 
        email: email, 
        role: 'manager', 
        // Simule que le gérant a déjà terminé la configuration !
        is_setup_complete: true // Clé du succès : on simule qu'il est déjà un gérant configuré
    }; 
    onLogin(mockManagerUser);
    alert(`Bienvenue dans votre tableau de bord, Gérant !`);
    navigate('/dashboard/orders'); // Redirige vers le tableau de bord
};

  return (
     <div className={styles.pageWrapper}> {/* On ajoute un conteneur global */}
      <SimpleHeader />
      <div className={styles.content}>
        <div className={styles.illustrationSide}>
          <img src={illustration} alt="Illustration de commande de nourriture" />
        </div>
        <div className={styles.formSide}>
          <div className={styles.formContainer}>
            {/* 3. SUPPRIMEZ L'ANCIEN LOGO ICI */}
            <h1>Bon retour parmi nous !</h1>
          
          <form >
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
            <div className={styles.forgotPassword}>
              <Link to="#">Mot de passe oublié ?</Link>
            </div>
            
            
          </form>
          

       <div className={styles.roleActionButtons}>
                     
            <button 
                type="button" 
                className={`${styles.actionButton} ${styles.primaryButton}`}
                onClick={handleClientLogin} // ACTION 2 : Client (Redirection Accueil)
            >
                <FiLogIn /> Connexion Client
            </button>

            <button 
                type="button" 
                className={`${styles.actionButton} ${styles.secondaryButton}`}
                onClick={handleManagerLogin} // ACTION 1 : PRIORITÉ au Gérant (Redirection Dashboard)
            >
                <FiLogIn /> Connexion Gérant
            </button>

        </div>

          
          <div className={styles.separator}>Ou</div>
          
          <div className={styles.socialLogin}>
            <button className={styles.socialButton}>
              <FaGoogle /> Continuer avec Google
            </button>
            <button className={styles.socialButton}>
              <FaFacebookF /> Continuer avec Facebook
            </button>
          </div>
          
          <div className={styles.signUpLink}>
            <p>Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link></p>
          </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default LoginPage;