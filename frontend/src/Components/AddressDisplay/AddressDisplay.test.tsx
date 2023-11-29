import { render } from '@testing-library/react';
import { AddressDisplay } from './AddressDisplay';
import { describe, it, expect } from 'vitest';
import { AuthContext } from '../../Contexts/Auth';

describe('Vitest Snapshot testing suite', () => {
  it('Matches DOM Snapshot', () => {
    const tree = render(
      <AuthContext.Provider value={{ jwt: 'test' }}>
        <AddressDisplay
          trustedPoint={{
            id: '1234',
            location: {
              lat: 0,
              lng: 0,
            },
            hours: {},
            address: '1 elizabeth street, melbourne',
          }}
        />
      </AuthContext.Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
