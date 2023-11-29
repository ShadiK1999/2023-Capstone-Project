import { produce } from 'immer';
import { AuthState } from './index';

export type AuthAction =
  | {
      type: 'USER_LOGGED_IN';
      payload: string;
    }
  | {
      type: 'USER_LOGGED_OUT';
    };

export const authReducer = produce((draft: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      draft.jwt = action.payload;
      break;
    case 'USER_LOGGED_OUT':
      draft.jwt = null;
      break;
  }
});
