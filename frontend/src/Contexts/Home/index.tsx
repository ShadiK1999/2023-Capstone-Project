import { FC, ReactNode, useReducer } from 'react';
import { HomeContext, HomeDispatchContext, initialState } from './state';
import { homeReducer } from './reducer';

type ComponentProps = {
  children: ReactNode;
};

const HomeProvider: FC<ComponentProps> = ({ children }) => {
  const [state, dispatch] = useReducer(homeReducer, initialState);

  return (
    <HomeContext.Provider value={state}>
      <HomeDispatchContext.Provider value={dispatch}>{children}</HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
};

export { HomeProvider };
