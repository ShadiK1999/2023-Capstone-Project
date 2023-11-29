import { render } from '@testing-library/react';
import { Map } from './Map';
import { describe, it, expect } from 'vitest';

describe('Jest Snapshot testing suite', () => {
  it('Matches DOM Snapshot', () => {
    const tree = render(<Map />);
    expect(tree).toMatchSnapshot();
  });
});
