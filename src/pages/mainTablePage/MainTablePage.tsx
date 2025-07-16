import styles from './MainTablePage.module.scss'

import type { FC } from 'react';
import { VehicleList } from '../../components/vehicleList/VehicleList';
import { MapView } from '../../components/mapView/MapView';


export const MainTablePage: FC = () => {


  return (
    <>
      <div className={styles.title__container}>
        <h1 className={styles.title}>Car Management</h1>
      </div>
      <MapView/>
      <VehicleList />
    </>
  );
};