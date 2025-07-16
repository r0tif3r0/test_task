import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useVehicleStore } from "../../store/vehicleStore";

import styles from "./MapView.module.scss"
import "leaflet/dist/leaflet.css";

export const MapView = () => {
  const { vehicles } = useVehicleStore();

  return (
    <MapContainer center={[59.94, 30.19]} zoom={10} className={styles.map}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {vehicles.map((v) => (
        <Marker key={v.id} position={[v.latitude, v.longitude]}>
          <Popup>
            {v.name} {v.model}, {v.year}<br/> ${v.price}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
