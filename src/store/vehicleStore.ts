import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Vehicle } from "../interfaces/IVehicle";
import { getVehicles } from "../api/axios.api";

interface VehicleStore {
  vehicles: Vehicle[];
  fetchVehicles: () => Promise<void>;
  updateVehicle: (id: number, data: Partial<Vehicle>) => void;
  deleteVehicle: (id: number) => void;
}

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get) => ({
      vehicles: [],
      fetchVehicles: async () => {
        if (get().vehicles.length === 0) {
          const data = await getVehicles();
          set({ vehicles: data });
        }
      },
      updateVehicle: (id, data) => {
        set((state) => ({
          vehicles: state.vehicles.map((v) =>
            v.id === id ? { ...v, ...data } : v
          ),
        }));
      },
      deleteVehicle: (id) => {
        set((state) => ({
          vehicles: state.vehicles.filter((v) => v.id !== id),
        }));
      },
    }),
    {
      name: "vehicle-storage"
    }
  )
);
