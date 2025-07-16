import { useState } from "react";
import type { Vehicle } from "../../interfaces/IVehicle";
import { useVehicleStore } from "../../store/vehicleStore";

export const VehicleItem = ({ vehicle }: { vehicle: Vehicle }) => {
  const { updateVehicle, deleteVehicle } = useVehicleStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(vehicle.name);
  const [price, setPrice] = useState(vehicle.price);

  const handleSave = () => {
    updateVehicle(vehicle.id, { name, price });
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {vehicle.name} {vehicle.model} ({vehicle.year}) — ${vehicle.price}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => deleteVehicle(vehicle.id)}>Delete</button>
    </li>
  );
};
