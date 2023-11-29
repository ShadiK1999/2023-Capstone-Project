import { memo, useContext } from 'react';
import { HomeContext } from '../../../Contexts/Home/state';
import { PolygonF } from '@react-google-maps/api';

const IsochroneRings = memo(() => {
  const { map } = useContext(HomeContext);

  if (!map.isochroneRings) return null;

  const { inner, middle, outer } = map.isochroneRings;

  const red = '#ff0000';
  const yellow = '#ffff00';
  const green = '#00ff00';

  return (
    <>
      <PolygonF
        paths={inner}
        options={{ fillOpacity: 0.2, strokeColor: green, fillColor: green }}
      />
      <PolygonF
        paths={middle}
        options={{ fillOpacity: 0.2, strokeColor: yellow, fillColor: yellow }}
      />
      <PolygonF paths={outer} options={{ fillOpacity: 0.2, strokeColor: red, fillColor: red }} />
    </>
  );
});

IsochroneRings.displayName = 'IsochroneRings';

export { IsochroneRings };
