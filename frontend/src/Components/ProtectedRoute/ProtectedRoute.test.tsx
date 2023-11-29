import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AuthContext } from '../../Contexts/Auth';
import { ProtectedRoute } from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('ProtectedRoute', () => {
  it('Renders page if user is logged in', () => {
    const { container } = render(
      <AuthContext.Provider value={{ jwt: 'hello' }}>
        <MemoryRouter initialEntries={['/protected/route']}>
          <Routes>
            <Route path="/" element={'Index'} />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <>Hello</>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(container).toHaveTextContent('Hello');
  });

  it('Redirects if user is not logged in', () => {
    const { container } = render(
      <AuthContext.Provider value={{ jwt: null }}>
        <MemoryRouter initialEntries={['/protected/route']}>
          <Routes>
            <Route path="/" element={'Index'} />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <>Hello</>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(container).toHaveTextContent('Index');
  });
});
