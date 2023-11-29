import { Dispatch, FC, ReactNode, createContext, useContext, useReducer } from 'react';
import { UserAction, userReducer } from './reducer';
import { TrustedNeighbour } from '../../Models/TrustedNeighbour';

export type UserState = {
  user: TrustedNeighbour | 'not-loaded';
};

export const UserContext = createContext<UserState | undefined>(undefined);
export const UserDispatchContext = createContext<Dispatch<UserAction>>(() => void 0);

type ComponentProps = {
  children: ReactNode;
};

const UserProvider: FC<ComponentProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: 'not-loaded',
  });

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within UserContext');
  }

  return context;
};

export { UserProvider };
