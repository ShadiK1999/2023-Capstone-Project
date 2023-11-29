import React from 'react';
import { AuthVerify, Layout, ProtectedRoute } from './Components';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Home, NotFound, User } from './Pages';
import { useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist';
import { AuthProvider } from './Contexts';

export const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      { path: '/', Component: Home },
      {
        path: '/user',
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
]);

const DEFAULT_LIBRARIES: Libraries = ['places'];

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

function Root() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    libraries: DEFAULT_LIBRARIES,
  });

  return (
    <AuthProvider>
      <Layout>{isLoaded ? <Outlet /> : <h3>Loading...</h3>}</Layout>
      <AuthVerify />
    </AuthProvider>
  );
}

export default App;
