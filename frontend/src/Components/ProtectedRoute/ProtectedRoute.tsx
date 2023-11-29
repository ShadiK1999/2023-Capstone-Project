import { FC, ReactElement } from 'react';
import { useIsAuthenticated } from '../../Contexts/Auth';
import { Navigate } from 'react-router-dom';

type ComponentProps = {
  children: ReactElement;
};

const ProtectedRoute: FC<ComponentProps> = ({ children }) => {
  const isAuth = useIsAuthenticated();

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export { ProtectedRoute };
