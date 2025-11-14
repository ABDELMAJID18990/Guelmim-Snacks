
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'; // On importe la Sidebar que vous avez déjà créée
import styles from './DashboardLayout.module.css';

function DashboardLayout() {
  return (
    <div className={styles.layout}>
      {/* Colonne de Gauche : La Barre Latérale (fixe) */}
      <DashboardSidebar />
      
      {/* Colonne de Droite : Le Contenu de la Page (qui change) */}
      <main className={styles.mainContent}>
        <Outlet /> {/* <-- react-router va injecter la page active (OrdersPage, MenuPage, etc.) ici */}
      </main>
    </div>
  );
}

export default DashboardLayout;