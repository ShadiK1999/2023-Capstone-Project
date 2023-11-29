import { Dispatch, FC, ReactNode, createContext, useContext, useEffect, useReducer } from 'react';
import { AuthAction, authReducer } from './reducer';
import jwt_decode from 'jwt-decode';
export type AuthState = { jwt: string | null };

export type JwtToken = {
  email: string;
  // Id
  sub: string;
  // Timestamp to expire
  exp: number;
  name: string;
};
// Do not use this context, the intended way to use this context is by using the below "use" hooks,
// not by doing `const auth = useContext(AuthContext)`. This context is only exported for mocking purposes
export const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(() => void 0);

type ComponentProps = {
  children: ReactNode;
};

const AuthProvider: FC<ComponentProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { jwt: localStorage.getItem('jwt') });

  useEffect(() => {
    if (state.jwt) {
      localStorage.setItem('jwt', state.jwt);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [state.jwt]);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export function useGetDecodedJwt() {
  const context = useContext(AuthContext);

  if (!context || !context.jwt) {
    throw new Error('useDecodedJwt must be used within a Auth Provider and user must be logged in');
  }

  return jwt_decode<JwtToken>(context.jwt);
}

export function useIsAuthenticated(): boolean {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useIsAuthenticated must be used within a Auth Provider');
  }

  return !!context.jwt;
}

/**
 * Function to get the jwt to use for api requests. It is expected to be null,
 * which is when the jwt has expired. The consumer is expected to handle this null
 * value.
 * @returns the jwt
 */
export function useJwt(): string | null {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useJwt must be used within a Auth Provider and user must be logged in');
  }

  if (!context.jwt) return null;

  return context.jwt;
}

export { AuthProvider };
