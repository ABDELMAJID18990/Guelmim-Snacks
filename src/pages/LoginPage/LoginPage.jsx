import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import SimpleHeader from '../../components/layout/SimpleHeader/SimpleHeader'; 
import Input from '../../components/ui/Input/Input';
import styles from './LoginPage.module.css';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import illustration from '../../assets/images/login-illustration.jpg'; 



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log("Login attempt:", { email, password });
    // Ici, plus tard, vous appellerez votre API Laravel
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
          
          <form onSubmit={handleSubmit}>
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
            
            <button type="submit" className={styles.loginButton}>
              <FiLogIn /> Se connecter
            </button>
          </form>
          
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