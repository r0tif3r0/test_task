import axios from "axios";
import type { Vehicle } from "../interfaces/IVehicle";

const BASE_URL = "https://ofc-test-01.tspb.su/test-task";

/**
 * Отправляет запрос на получение списка vehicles
 * @returns Promise с массивом Vehicle
 */
export const getVehicles = async (): Promise<Vehicle[]> => {
  const response = await axios.get(`${BASE_URL}/vehicles`);
  return response.data;
};