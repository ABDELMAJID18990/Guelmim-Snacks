import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 

import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


import styles from './LocationSection.module.css';

function LocationSection({ snackData }) {
  // Coordonnées GPS (exemple pour Guelmim, à ajuster)
  const position = [28.9930812, -10.0570463]; 

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Colonne des Informations */}
        <div className={styles.infoColumn}>
          <h2 className={styles.title}>Où nous trouver ?</h2>
          <p className={styles.address}>{snackData.address}</p>
          <div className={styles.hours}>
            <h3 className={styles.hoursTitle}>Horaires d'ouverture</h3>
            <p>Lundi - Samedi : 11h00 - 23h00</p>
            <p>Dimanche : Fermé</p>
          </div>
          <a href={`https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`} 
             target="_blank" rel="noopener noreferrer" className={styles.directionsButton}>
            Obtenir l'itinéraire
          </a>
        </div>

        {/* Colonne de la Carte */}
        <div className={styles.mapColumn}>
          <MapContainer center={position} zoom={15} scrollWheelZoom={false} className={styles.map}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                {snackData.name} <br /> {snackData.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;