import { Dispatch, createContext } from 'react';
import { HomeAction } from './reducer';
import { DisplayPoint } from '../../Models/DeliveryPoint';

type IsochroneRings = {
  inner: google.maps.LatLngLiteral[];
  middle: google.maps.LatLngLiteral[];
  outer: google.maps.LatLngLiteral[];
};

type Map = {
  currentLocation: google.maps.LatLngLiteral;
  isochroneRings: IsochroneRings | null;
};

export type DayOfWeekIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Filter = {
  type: 'distance' | 'duration';
  mode: 'WALKING' | 'DRIVING' | 'CYCLING';
  value: number;
  dayOfWeek: DayOfWeekIndex;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
};

export type HomeState = {
  map: Map;
  deliveryPoints: DisplayPoint[] | null;
  isLoading: boolean;
  filter: Filter;
};

export const initialState: HomeState = {
  map: {
    currentLocation: {
      lat: -37.8124,
      lng: 144.9623,
    },
    isochroneRings: null,
  },
  deliveryPoints: null,
  isLoading: false,
  filter: {
    type: 'duration',
    mode: 'WALKING',
    value: 5,
    dayOfWeek: 0,
    startHour: 9,
    startMin: 0,
    endHour: 17,
    endMin: 0,
  },
};

export const HomeContext = createContext<HomeState>(initialState);
export const HomeDispatchContext = createContext<Dispatch<HomeAction>>(() => void 0);
