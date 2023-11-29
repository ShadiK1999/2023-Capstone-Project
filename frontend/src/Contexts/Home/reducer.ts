import { HomeState, Filter } from './state';
import { IsochroneRingsOutput } from '../../Services/Isochrone';
import { produce } from 'immer';
import { DisplayPoint } from '../../Models/DeliveryPoint';

export type HomeAction =
  | {
      type: 'ISOCHRONE_READY';
      payload: IsochroneRingsOutput;
    }
  | {
      type: 'ADDRESS_CHANGED';
      payload: google.maps.LatLngLiteral;
    }
  | {
      type: 'FETCH_DELIVERY_POINTS_SUCCESS';
      payload: DisplayPoint[];
    }
  | {
      type: 'START_LOADING';
    }
  | {
      type: 'LOAD_SUCCESSFUL';
    }
  | {
      type: 'FILTER_INPUT_CHANGED';
      payload: Filter;
    };

export const homeReducer = produce((draft: HomeState, action: HomeAction) => {
  switch (action.type) {
    case 'ISOCHRONE_READY':
      draft.map.isochroneRings = action.payload;
      break;
    case 'ADDRESS_CHANGED':
      draft.map.currentLocation = action.payload;
      break;
    case 'FILTER_INPUT_CHANGED':
      draft.filter = action.payload;
      break;
    case 'FETCH_DELIVERY_POINTS_SUCCESS':
      draft.deliveryPoints = action.payload;
      break;
    case 'START_LOADING':
      draft.isLoading = true;
      break;
    case 'LOAD_SUCCESSFUL':
      draft.isLoading = false;
      break;
  }
});
