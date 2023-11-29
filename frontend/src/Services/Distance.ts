/* istanbul ignore file */
import { chunks } from '../Utils/chunks';

export type DistanceResult = {
  distanceValue: number;
  distanceText: string;
  durationValue: number;
  durationText: string;
};

type TravelMode = 'WALKING' | 'DRIVING' | 'CYCLING';
type GoogleTravelMode = 'WALKING' | 'DRIVING' | 'BICYCLING';

// This mapping is done because google maps travel mode refers to BICYLING, but mapbox api refers to to CYCLING
// can remove this when we switch over to mapbox for the getDistance function
const TRAVEL_MODE_MAPPING: { [key in TravelMode]: GoogleTravelMode } = {
  WALKING: 'WALKING',
  DRIVING: 'DRIVING',
  CYCLING: 'BICYCLING',
};

const GOOGLE_MAP_LIMIT = 25;

export async function getDistance(
  origin: google.maps.LatLngLiteral,
  destinations: google.maps.LatLngLiteral[],
  travelMode: TravelMode,
): Promise<DistanceResult[]> {
  const googleTravelMode = TRAVEL_MODE_MAPPING[travelMode];

  const service = new google.maps.DistanceMatrixService();

  const destLists = [...chunks(destinations, GOOGLE_MAP_LIMIT)];

  const datas = await Promise.all(
    destLists.map((dests) =>
      service.getDistanceMatrix({
        origins: [origin],
        destinations: dests,
        travelMode: google.maps.TravelMode[googleTravelMode],
        unitSystem: google.maps.UnitSystem.METRIC,
      }),
    ),
  );

  return datas.flatMap((data) =>
    data.rows[0].elements.map(({ distance, duration }) => ({
      distanceText: distance.text,
      distanceValue: distance.value,
      durationText: duration.text,
      durationValue: duration.value,
    })),
  );
}

export function getApproximateMaximumDistance(minutes: number, travelMode: TravelMode): number {
  let speedKmh: number;

  switch (travelMode) {
    case 'WALKING':
      speedKmh = 5;
      break;
    case 'CYCLING':
      speedKmh = 15;
      break;
    case 'DRIVING':
      speedKmh = 40;
      break;
    default:
      throw new Error('Invalid travel mode');
  }
  return (minutes / 60) * speedKmh;
}
