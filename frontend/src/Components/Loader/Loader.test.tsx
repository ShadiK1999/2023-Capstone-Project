import { Loader } from './Loader';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Vitest Snapshot testing suite', () => {
  it('Matches DOM Snapshot', () => {
    const tree = render(<Loader />);
    expect(tree).toMatchSnapshot();
  });
});
