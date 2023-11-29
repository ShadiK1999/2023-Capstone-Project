import { produce } from 'immer';
import { UserState } from '.';
import { TrustedNeighbour } from '../../Models/TrustedNeighbour';
import { TrustedPoint } from '../../Models/DeliveryPoint';

export type UserAction =
  | {
      type: 'FETCHED_USER';
      payload: TrustedNeighbour;
    }
  | {
      type: 'UPDATED_ADDRESS';
      payload: TrustedPoint;
    };

export const userReducer = produce((draft: UserState, action: UserAction) => {
  switch (action.type) {
    case 'FETCHED_USER':
      draft.user = action.payload;
      break;
    case 'UPDATED_ADDRESS':
      if (draft.user !== 'not-loaded') {
        draft.user.deliveryPoint = action.payload;
      }
      break;
  }
});
