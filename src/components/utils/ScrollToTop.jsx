import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Le hook `useLocation` nous donne un objet "location" qui représente l'URL actuelle
  const { pathname } = useLocation();

  // Le hook `useEffect` se déclenchera à chaque fois que `pathname` (notre URL) change
  useEffect(() => {
    // Cette commande native du navigateur remet le scroll tout en haut
    window.scrollTo(0, 0);
  }, [pathname]); 


  return null;
}

export default ScrollToTop;