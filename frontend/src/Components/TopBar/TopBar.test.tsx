import { TopBar } from './TopBar';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthContext } from '../../Contexts/Auth';
import { MemoryRouter } from 'react-router-dom';

describe('Jest Snapshot testing suite', () => {
  it('Matches DOM Snapshot', () => {
    const tree = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ jwt: null }}>
          <TopBar />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});
