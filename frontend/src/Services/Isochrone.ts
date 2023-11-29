/* istanbul ignore file */
export type IsochroneInput = {
  base: IsochroneBase;
  value: RingsValue;
};

type IsochroneBase = {
  lat: number;
  lng: number;
  type: 'distance' | 'duration';
  mode: 'WALKING' | 'DRIVING' | 'CYCLING';
};

/**
 * For type = 'distance', value represents meters
 * For type = 'duration', value represents minute
 */
type RingsValue = {
  inner: number;
  middle: number;
  outer: number;
};

export type IsochroneRingsOutput = {
  inner: Isochrone;
  middle: Isochrone;
  outer: Isochrone;
};

export type IsochroneOutput = {
  status: string;
  points: Isochrone;
};

type Isochrone = Array<google.maps.LatLngLiteral>;

type MapBoxFeature = {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: [MapBoxLatLng[]];
  };
  properties: {
    contour: number;
    metric: 'time' | 'distance';
  };
};
type MapBoxResponse = {
  type: 'FeatureCollection';
  features: MapBoxFeature[];
};
type MapBoxLatLng = [number, number];

export async function computeIsochroneRings({
  base,
  value: { inner, middle, outer },
}: IsochroneInput): Promise<IsochroneRingsOutput> {
  const contourValues = [inner, middle, outer].join(',');
  const params = new URLSearchParams({
    polygons: 'true',
    access_token: import.meta.env.VITE_MAPBOX_API,
  });
  params.append(base.type === 'distance' ? 'contours_meters' : 'contours_minutes', contourValues);

  const coordinates = `${base.lng},${base.lat}`;
  const response = await fetch(
    `https://api.mapbox.com/isochrone/v1/mapbox/${base.mode.toLowerCase()}/${coordinates}?${params.toString()}`,
    {
      method: 'GET',
    },
  );

  const mapboxResponse = (await response.json()) as MapBoxResponse;
  const isochrones: Isochrone[] = mapboxResponse.features
    .sort((x, y) => x.properties.contour - y.properties.contour)
    .map((feature) => feature.geometry.coordinates[0].map(([lng, lat]) => ({ lng, lat })));

  return {
    inner: isochrones[0],
    middle: isochrones[1],
    outer: isochrones[2],
  };
}
