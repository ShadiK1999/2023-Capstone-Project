import { memo, useContext } from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';

import * as styles from './Map.styles';
import { IsochroneRings } from './IsochroneRings';
import { HomeContext } from '../../Contexts/Home/state';
import { Markers } from './Markers';

const Map = memo(() => {
  const { map } = useContext(HomeContext);
  return (
    <GoogleMap mapContainerClassName={styles.MapContainer} center={map.currentLocation} zoom={15}>
      <MarkerF position={map.currentLocation} />
      <IsochroneRings />
      <Markers />
    </GoogleMap>
  );
});

Map.displayName = 'Map';

export { Map };
